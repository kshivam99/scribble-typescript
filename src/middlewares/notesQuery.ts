
export const queryAddNote = `mutation MyMutation($email: String!, $label: String!,$pinned: Boolean!, $text: String!) {
    insert_notes_one(object: {email: $email, label: $label, pinned: $pinned, text: $text}) {
      _id
      archived
      date
      email
      label
      pinned
      text
      trash
    }
  }`;

export const queryDeleteNote=`mutation MyMutation($_id: uuid!) {
  delete_notes_by_pk(_id: $_id) {
    _id
  }
}
`