import supabase from "./supabase";
import * as oldData from "./CougarCS-Contacts.json";
import { oldDataType, contactType, membershipType } from "./types";
import {
  membershipReasonConversion,
  phoneNumberConversion,
  semesterToTimestampTZ,
} from "./conversions";
require("dotenv").config();

const addContact = async (
  contactData: oldDataType
): Promise<{ message: string; ok: boolean }> => {
  const old_number = contactData.Item["Phone Number"].S;
  const phone_number = phoneNumberConversion(old_number);

  const contact: contactType = {
    uh_id: parseInt(contactData.Item.PSID.S),
    email: contactData.Item.Email.S,
    first_name: contactData.Item["First Name"].S,
    last_name: contactData.Item["Last Name"].S || null,
    phone_number,
    shirt_size_id: contactData.Item["Shirt Size"].S || null,
  };

  const insertedContact = await supabase.from("contacts").insert(contact);

  if (insertedContact.error) {
    return {
      message: `ERROR: "${contact.email}" ${JSON.stringify(
        insertedContact.error,
        null,
        1
      )}`,
      ok: false,
    };
  }

  if (!contactData.Item["Membership Start"].M) {
    return {
      message: `Inserted: "${contact.email}" ${JSON.stringify(
        insertedContact
      )}`,
      ok: true,
    };
  }

  const fetchContact = await supabase
    .from("contacts")
    .select("contact_id")
    .eq("email", contact.email);

  if (fetchContact.error) {
    return {
      message: `ERROR: "${contact.email}" ${JSON.stringify(
        fetchContact.error,
        null,
        1
      )}`,
      ok: false,
    };
  }

  const historyArr = contactData.Item["Transaction History"].L;

  const membership: membershipType = {
    contact_id: fetchContact.data[0].contact_id,
    start_date: semesterToTimestampTZ(
      contactData.Item["Membership Start"].M.Year.S,
      contactData.Item["Membership Start"].M.Term.S,
      "start"
    ),
    end_date: semesterToTimestampTZ(
      contactData.Item["Membership End"].M.Year.S,
      contactData.Item["Membership End"].M.Term.S,
      "end"
    ),
    membership_code_id: membershipReasonConversion(
      historyArr[historyArr.length - 1].S
    ),
  };

  const insertedMembership = await supabase
    .from("membership")
    .insert(membership);

  if (insertedMembership.error) {
    return {
      message: `ERROR: "${contact.email}" ${JSON.stringify(
        insertedMembership.error,
        null,
        1
      )}`,
      ok: false,
    };
  }

  return {
    message: `Inserted: "${contact.email}" ${JSON.stringify(
      insertedContact
    )}\nMembership: ${JSON.stringify(insertedMembership)}`,
    ok: true,
  };
};

const run = async () => {
  console.log("Script Started:\n");
  const email = process.env.COUGARCS_EMAIL;
  const password = process.env.COUGARCS_PASSWORD;

  if (!email || !password) {
    console.log(
      "Please specify your CougarCS email and password in the .env file."
    );
    return;
  }

  const signIn = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signIn.error || !signIn.data.session) {
    console.log(`Error: ${signIn.error}`);
    return;
  }

  console.log("Supabase sign-in successful!\n");

  const inputData = oldData;

  for (let i = 0; i < inputData.length; i++) {
    const response = await addContact(inputData[i]);
    if (!response.ok) {
      console.error(response.message);
      return;
    }
    console.log(`[${i + 1}] ${response.message}`);
  }
};

const signup = async () => {
  const email = process.env.COUGARCS_EMAIL;
  const password = process.env.COUGARCS_PASSWORD;

  if (!email || !password) {
    console.log(
      "Please specify your CougarCS email and password in the .env file."
    );
    return;
  }

  const signIn = await supabase.auth.signUp({
    email,
    password,
  });
};

run();
