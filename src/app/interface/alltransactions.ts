export interface AllTransDatas {
    trans_id: number;
    trans_ammount: string;
    trans_before_wallet_ammount: string;
    trans_after_wallet_ammount: string;
    trans_status: string;
    trans_datetime: string;
    trans_send_account: string;
    trans_send_ifsc: string;
    trans_send_name: string;
    trans_send_bank_name: string;
    user: {
      name: string;
      photo: string;
      userid: string;
    }
  }