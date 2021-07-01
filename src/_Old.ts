import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {cmsService} from "../../../../services/cms.service";
import {ComboBoxComponent} from "@progress/kendo-angular-dropdowns";
import {Expression, ExpressionHelper} from "../../../../helpers/expression.helper";

@Component({
    selector: 'admin-expression-box',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *ngIf="Expression">
            <ng-container *ngIf="!IsChild">
                <span #expressionPopup class="btn expression-edit-btn k-icon k-i-formula-fx" title="Ввести выражение" 
                      (click)="showExpressionPopup = true">
                </span>
                <kendo-popup *ngIf="showExpressionPopup" 
                             [anchor]="expressionPopup" (anchorViewportLeave)="showExpressionPopup = false">
                    <input type="text" [(ngModel)]="StringExpression">
                    <span class="btn" (click)="acceptExpression()">Применить</span>
                </kendo-popup>
            </ng-container>
            <ng-container *ngIf="Expression.Children?.length; else oneLevel">
                <span class="sq-bracket">(</span>
                <div class="inner-expression">
                    <ng-container *ngFor="let child of Expression.Children; let i = index">
                        <admin-expression-box
                                [IsChild]="true"
                                [Expression]="child"
                                [IsDisabled]="IsDisabled"
                                (DoubleClick)="DoubleClick.emit()"
                                (ChildChange)="emitChildChange();"
                        ></admin-expression-box>
                        <span class="btn" (click)="removeChild(child)" *ngIf="child.Operator == null && ((i > 0 && i == Expression.Children.length - 1) || child.Part == null) && !IsDisabled">-</span>
                    </ng-container>
                    <span *ngIf="!IsDisabled" class="btn" (click)="addChild()">+</span>
                </div>
                <span class="sq-bracket">)</span>
                <span *ngIf="IsChild && !IsDisabled" class="btn" (click)="toggleBrackets()"><del>()</del></span>
            </ng-container>
            <ng-template #oneLevel>
                <kendo-combobox #comboBoxComponent *ngIf="Expression.Operator == null"
                                [filterable]="true"
                                [data]="cms.modelFields | async"
                                [suggest]="true" [clearButton]="true" [allowCustom]="true"
                                [disabled]="IsDisabled"
                                [ngModel]="Expression.Part"
                                (dblclick)="DoubleClick.emit()"
                                (filterChange)="filterModelFields(comboBoxComponent, $event)"
                                (valueChange)="Expression.Part = $event; emitChildChange();"
                ></kendo-combobox>
                
                <span class="btn" (click)="toggleBrackets()" *ngIf="!Expression.Operator && !IsDisabled">()</span>
                
                <kendo-dropdownlist *ngIf="Expression.Part == null && Expression.Operator && IsChild"
                                    [data]="SOperators"
                                    [ngModel]="Expression.Operator"
                                    [disabled]="IsDisabled"
                                    (dblclick)="DoubleClick.emit()"
                                    (selectionChange)="Expression.Operator = $event; emitChildChange();"
                                    class="operator-dropdown">
                </kendo-dropdownlist>
            </ng-template>
            <ng-container *ngIf="!IsChild">
                <span class="result-expression">Результат: {{StringExpression}}</span>
            </ng-container>
        </ng-container>
    `,
    styles:[`
        .sq-bracket {
            display: block;
        }
        .operator-dropdown {
            width: 60px;
            padding: 0 5px;
        }
        .inner-expression {
            padding-left: 10px;
        }
        .result-expression {
            display: block;
            color: #9e9e9e;
            font-size: 10px;
        }
        .expression-edit-btn {
            position: absolute;
            padding: 7px 12px 7px 0;
            line-height: 0;
            top: 29px;
            left: -8px;
        }
    `],
    moduleId: module.id
})
export class AdminExpressionBox {
    @Input() public StringExpression: string;
    @Input() public Expression: Expression;
    @Input() public IsChild: boolean;
    @Input() public IsDisabled: boolean;

    @Output() public ExpressionChange = new EventEmitter<string>();
    @Output() public DoubleClick = new EventEmitter<any>();
    @Output() public ChildChange = new EventEmitter<any>();

    private CurrStringExpression: string;
    public SOperators = ExpressionHelper.Operators;
    public showExpressionPopup: boolean;

    constructor(public cms: cmsService) {}

    ngOnChanges() {
        if (!this.Expression) {
            this.Expression = new Expression();
            this.Expression.Children = [];
            this.addOneLevelExpression();
        }

        if (!this.StringExpression)
            return;

        if (this.CurrStringExpression != this.StringExpression) {
            this.CurrStringExpression = this.StringExpression;
            this.Expression = ExpressionHelper.parsePart(this.CurrStringExpression);
        }
    }

    /**
     * Применяем изменения в выражении
     */
    emitChildChange() {
        if (!this.IsChild) {
            let strExpression = this.expressionToString(this.Expression);
            this.StringExpression = strExpression != "null" ? strExpression : null;
            this.CurrStringExpression = this.StringExpression;
            this.ExpressionChange.emit(this.StringExpression);
        } else {
            this.ChildChange.emit();
        }
    }

    /**
     * Преобразовываем древовидную структуру в строку
     * @param {Expression} expression
     * @param {boolean} isChild
     * @returns {string}
     */
    private expressionToString(expression: Expression, isChild?: boolean): string {
        let expString = "";

        if (expression.Operator != null)
            expString += " " + expression.Operator + " ";
        else if (expression.Part != null) {
            let part = expression.Part;
            let type = ExpressionHelper.getType(expression.Part);

            if (type == "undefined") {
                part = "null";
            }

            let modelFields = this.cms.modelFields.getValue();
            if (modelFields && !modelFields.includes(expression.Part)
                && type == "string" && !expression.Part.startsWith("'")) {
                part = "'" + part + "'";
            }

            expString += part;
        }
        else if (expression.Children && expression.Children.length) {
            for (let expChild of expression.Children) {
                expString += this.expressionToString(expChild, true);
            }
            if (isChild)
                expString = "(" + expString + ")";
        }
        else expString += "null";

        return expString;
    }

    /**
     * Добавляем оператор и слагаемое
     */
    addChild() {
        this.Expression.Children.push({Operator: ExpressionHelper.Operators[0]});
        this.Expression.Children.push({});
        this.emitChildChange();
    }

    /**
     * Удаляем оператор и слагаемое
     * @param {Expression} child
     */
    removeChild(child: Expression) {
        let ind = this.Expression.Children.indexOf(child) - 1;
        this.Expression.Children.splice(ind > 0 ? ind : 0, 2);
        this.emitChildChange();
    }

    /**
     * Меняем обычное слагаемое на выражение и обратно
     */
    toggleBrackets() {
        if (this.Expression.Children && this.Expression.Children.length) {
            this.Expression.Children = null;
            this.Expression.Operator = null;
        } else {
            this.Expression.Children = [];
            this.Expression.Part = null;
            this.addOneLevelExpression();
        }

        this.emitChildChange();
    }

    /**
     * Добавляем одноуровневое выражение
     */
    addOneLevelExpression() {
        this.Expression.Children.push({});
        this.Expression.Children.push({Operator: ExpressionHelper.Operators[0]});
        this.Expression.Children.push({});
    }

    /**
     * Фильтр
     */
    filterModelFields(box: ComboBoxComponent, filterString: string) {
        box.data = this.cms.modelFields.getValue().filter(f => f.toLowerCase().includes(filterString.toLowerCase()));
    }

    acceptExpression() {
        if (this.CurrStringExpression != this.StringExpression) {
            this.CurrStringExpression = this.StringExpression;
            this.Expression = ExpressionHelper.parsePart(this.CurrStringExpression);
        }

        this.emitChildChange();
        this.showExpressionPopup = false;
    }
}