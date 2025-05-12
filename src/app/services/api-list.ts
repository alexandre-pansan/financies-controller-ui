import { Injectable } from "@angular/core";
import { ApiModel } from "./api-model";
import { get as lodashGet } from 'lodash'

@Injectable()
export class ApiList {
    private readonly baseApiUrl: string = 'http://localhost:3000';
    private readonly endpoints: ApiModel = {
        user: `${this.baseApiUrl}/user`,
        transactionCategories: `${this.baseApiUrl}/transaction-categories`,
        transactions: `${this.baseApiUrl}/transactions`,
        transactionGroups: `${this.baseApiUrl}/transaction-groups`,
        payslips: `${this.baseApiUrl}/payslips`,
        installments: `${this.baseApiUrl}/installments`,
        auth: `${this.baseApiUrl}/auth`,
        authLogin: `${this.baseApiUrl}/auth/login`,
    }

    getEndpoint(key: string): string {
        return lodashGet(this.endpoints, key, '');
    }
}