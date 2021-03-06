export class Order {
    id?: number;
    usuario?: number;
    estado?: string;
    precio_total?: number;
    invoice_no?: string;
}

export class OrderItem {
  id?: number;
  productos?: number;
  orden?: number;
  precio?: number;
  cantidad?: number;
}

export interface EpaycoTransaction{
  success:boolean;
  title_response: string;
  text_response: string;
  last_action: string;
  data:{
    x_cust_id_cliente:11736;
    x_ref_payco:2057000;
    x_id_factura: string;
    x_id_invoice: string;
    x_description: string;
    x_amount:40000;
    x_amount_country:40000;
    x_amount_ok:40000;
    x_tax:0;
    x_amount_base:0;
    x_currency_code: string;
    x_bank_name: string;
    x_cardnumber: string;
    x_quotas:12;
    x_respuesta: string;
    x_response: string;
    x_approval_code: string;
    x_transaction_id: string;
    x_fecha_transaccion: string;
    x_transaction_date: string;
    x_cod_respuesta:1;
    x_cod_response:1;
    x_response_reason_text: string;
    x_cod_transaction_state:1;
    x_transaction_state: string;
    x_errorcode: string;
    x_franchise: string;
    x_extra1: string;
    x_extra2: string;
    x_extra3: string;
    x_business: string;
    x_customer_doctype: string;
    x_customer_document: string;
    x_customer_name: string;
    x_customer_lastname: string;
    x_customer_email: string;
    x_customer_phone: string;
    x_customer_movil: string;
    x_customer_ind_pais: string;
    x_customer_country: string;
    x_customer_city: string;
    x_customer_address: string;
    x_customer_ip: string;
    x_signature: string;
    x_test_request: string;
    x_type_payment: string;
  }
  }
