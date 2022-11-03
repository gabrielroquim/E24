import { Verifier } from '@pact-foundation/pact';
import 'dotenv/config'

describe('Pact Verification', () => {
    it('should validate the pact', () => {
        const brokerOpts = {
            provider: 'ebac-demo-store-server',
            providerBaseUrl: process.env.PROVIDER_URL,
            pactUrls: ['http://localhost:9292/pacts/provider/ebac-demo-store-server/consumer/ebac-demo-store-admin/latest'],
            publishVerificationResult: true,
            providerVersion: '1.0.0'
        }
        return new Verifier(brokerOpts).verifyProvider()
    });
});