export type contactType = {
  uh_id: number;
  email: string;
  first_name: string;
  last_name?: string;
  phone_number?: number;
  shirt_size_id?: string;
};

export type oldDataType =
  | {
      Item: {
        PSID: { S: string };
        "Contact Added": { S: string };
        "Shirt Size": { S: string };
        "Phone Number": { S: string };
        "Last Name": { S: string };
        "Membership End": { M: { Year: { S: string }; Term: { S: string } } };
        "Membership Start": {
          M: { Year: { S: string }; Term: { S: string } };
          NULL?: undefined;
        };
        "First Name": { S: string };
        "Transaction History": { L: { S: string }[] };
        Email: { S: string };
      };
    }
  | {
      Item: {
        PSID: { S: string };
        "Contact Added": { S: string };
        "Shirt Size": { S: string };
        "Phone Number": { S: string };
        "Last Name": { S: string };
        "Membership End": { M: { Year: { S: string }; Term: { S: string } } };
        "Membership Start": { NULL: boolean; M?: undefined };
        "First Name": { S: string };
        "Transaction History": { L: { S: string }[] };
        Email: { S: string };
      };
    }
  | {
      Item: {
        PSID: { S: string };
        "Contact Added": { S: string };
        "Shirt Size": { S: string };
        "Phone Number": { S: string };
        "Last Name": { S: string };
        "Membership End": { M: { Year?: undefined; Term?: undefined } };
        "Membership Start": {
          M: { Year?: undefined; Term?: undefined };
          NULL?: undefined;
        };
        "First Name": { S: string };
        Email: { S: string };
        "Transaction History": { L: { S: string }[] };
      };
    };

export type membershipType = {
  contact_id: string;
  start_date: string;
  end_date: string;
  membership_code_id: string;
};
