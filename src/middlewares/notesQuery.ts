
export const queryGetNotes= `
query MyQuery($email: String!) {
  notes(where: {email: {_eq: $email}}) {
    email
    _id
    title
    text
    email
    pinned
    archived
    label
  }
}
`;
export const queryAddNote = `mutation MyMutation($email: String!, $label: String!,$pinned: Boolean!, $text: String!, $title: String!) {
  insert_notes_one(object: {email: $email, label: $label, pinned: $pinned, text: $text, title: $title}) {
    _id
    archived
    title
    email
    label
    pinned
    text
  }
}`;

export const queryDeleteNote=`mutation MyMutation($_id: uuid!) {
  delete_notes_by_pk(_id: $_id) {
    _id
  }
}
`
