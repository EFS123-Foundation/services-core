module Billing
  class GenerateBankSlipAction
    extend LightService::Action

    expects :payment_request

    executed do |context|
      response = gateway_client.create_transaction(transaction_params: transaction_params(context.payment_request))

      if response[:status] == 'waiting_payment'
        context.payment_request.wait_payment!(metadata: response)
        context.payment_request.update!(gateway: 'pagarme', gateway_id: response[:id])
        context.payment_request.create_bank_slip!(gateway_client.extract_bank_slip_attributes(response))
      else
        Raven.capture_message(
          'Invalid gateway request',
          level: :fatal,
          user: { id: context.payment_request.user_id },
          extra: response.merge(payment_request_id: context.payment_request.id)
        )
        context.fail_and_return!('Bank slip cannot be generated')
      end
    end

    def self.gateway_client
      Billing::Gateways::Pagarme::Client.new
    end

    def self.transaction_params(payment_request)
      Billing::Gateways::Pagarme::TransactionParamsBuilder.new(payment_request).build
    end
  end
end