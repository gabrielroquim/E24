import 'dotenv/config'

import { Pact } from "@pact-foundation/pact"
import { resolve } from 'path'
import { eachLike, somethingLike } from '@pact-foundation/pact/src/dsl/matchers';
import { customersList } from '../request/user.request';

const mockProvider = new Pact({
    consumer: 'ebac-demo-store-admin',
    provider: 'ebac-demo-store-server',
    port: parseInt(process.env.MOCK_PORT),
    log: resolve(process.cwd(), 'logs', 'pact.log'),
    dir: resolve(process.cwd(), 'pacts')
})

describe('Consumer Test', () => {

    beforeAll(async () => {
        await mockProvider.setup().then(() => {
            mockProvider.addInteraction({
                uponReceiving: 'a request',
                withRequest: {
                    method: 'POST',
                    path: '/graphql',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYnJpZWwiLCJpYXQiOjE2Njc1MTQ4MzMsImV4cCI6MTY2NzY4NzYzM30.8sB6b3VcpiusZNfBgJOAvbtRPRknVzyfEXDwacwf2K4',
                        "Content-Type": 'application/json'
                    },
                    body: {
                        "operationName": "customers",
                        "variables": {},
                        "query": "query customers($where: CustomerWhereInput, $orderBy: CustomerOrderByInput, $skip: Float, $take: Float) {\n  items: customers(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    createdAt\n    email\n    firstName\n    id\n    lastName\n    phone\n    updatedAt\n    orders {\n      id\n      __typename\n    }\n    address {\n      id\n      __typename\n    }\n    __typename\n  }\n  total: _customersMeta(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    count\n    __typename\n  }\n}\n"
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": 'application/json; charset=utf-8'
                    },
                    body: {
                        "data": {
                            "items": eachLike(
                                {
                                    "createdAt": somethingLike("2022-10-24T23:07:43.271Z"),
                                    "email": somethingLike("Cristina44@gmail.com"),
                                    "firstName": somethingLike("Bernd"),
                                    "id": somethingLike("cl9ne2zom01390spiwhf2kvsg"),
                                    "lastName": somethingLike("Franco"),
                                    "phone": somethingLike("(74) 73937-5189"),
                                    "updatedAt": somethingLike("2022-10-24T23:07:43.271Z"),
                                    "orders": [],
                                    "address": {
                                        "id": somethingLike("cl9xciy570133bwpikkxw5vyv"),
                                        "__typename": somethingLike("Address")
                                    },
                                    "__typename": somethingLike("Customer")
                                },
                                { min: 2 }
                            ),
                            "total": {
                                "count": "3",
                                "__typename": "MetaQueryPayload"
                            }
                        }
                    }

                }
            })
        })
    })

    afterAll(() => mockProvider.finalize())
    afterEach(() => mockProvider.verify())

    it('should return customers list', () => {
       customersList().then(response => {
            const { email, lastName } = response.data.data.items[1]

            expect(response.status).toEqual(200)
            expect(email).toBe('Cristina44@gmail.com')
            expect(lastName).toBe('Franco')
        })
    });
});