import {Injectable} from '@nestjs/common';
import 'isomorphic-fetch';

@Injectable()
export class ApiService {

    private token: any;

    readonly base_url = 'https://e7920-93.mycrmspace.de/rest/v10';

    readonly user = 'vlad';
    readonly password = 'te)%=NP,qA-97XaDg8';
    readonly clientId = 'test_key';
    readonly secret = 'test_secret';

    async getAccounts(client) {
        if (!this.token) {
            if (!await this.auth()) {
                console.log('auth error');
                return 'auth error';
            }
        }

        const opportunities = await this.getOpportunitiesByAmount(1000);

        opportunities.records.map(async (opportunity, index) => {
            const accounts = await this.getAccountDataByOpportunityId(opportunity.id);
            const account = accounts.records[0];


            const accountObj = {
                id: account.id,
                name: account.name,
                amount: account.amount,
                address: account.billing_address_country + ', ' + account.billing_address_city,
            };

            client.emit('marker', accountObj);
        });
    }

    private async getOpportunitiesByAmount(minAmount: number) {
        const params = {
            filter: [
                {
                    '$and': [
                        {
                            'amount': {
                                '$gte': 1000,
                            },
                        },
                        {
                            'sales_stage': {
                                '$not_equals': 'Closed Lost'
                            }
                        },
                        {
                            'sales_stage': {
                                '$not_equals': 'Closed Won'
                            }
                        }]
                }
            ],
            fields: 'id,amount,name,sales_stage'
        };

        return await this.execute('/Opportunities/filter', params);
    }

    private getAccountDataByOpportunityId(id) {
        return this.execute('/Opportunities/' + id + '/link/accounts', {}, 'GET');
    }

    private async auth() {
        const params = {
            grant_type: 'password',
            client_id: this.clientId,
            client_secret: this.secret,
            username: this.user,
            password: this.password,
            platform: 'custom_api'
        };

        const result = await this.execute('/oauth2/token', params);
        if (result.access_token) {
            console.log(result.access_token);
            this.token = result.access_token;
            return true;
        } else {
            return false;
        }
    }

    private execute(url, params, method = 'POST') {
        let headers = {};

        headers['Content-Type'] = 'application/json';
        if (this.token) {
            headers['oauth-token'] = this.token;
        }

        let fetchParams = {
            headers: headers,
            method: method,
        };

        if (params) {
            fetchParams['body'] = JSON.stringify(params);
        }

        url = this.base_url + url;

        return (() => {
            return fetch(url, fetchParams)
                .then(response => response.json());
        })();
    }
}