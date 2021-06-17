
export const queryGetNotes= `
query MyQuery($email: String!) {
  notes(where: {email: {_eq: $email}}) {
    _id
    title
    text
    pinned
    archived
    label
  }
  labels(where: {email: {_eq: $email}}) {
    _id
    label
  }
}

`;
export const queryAddNote = `mutation MyMutation($email: String!, $label: String!,$pinned: Boolean!, $text: String!, $title: String!) {
  insert_notes_one(object: {email: $email, label: $label, pinned: $pinned, text: $text, title: $title}) {
    _id
    archived
    title
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

export const queryAddLabel=`mutation MyMutation($label: String!, $email: String!) {
  insert_labels_one(object: {label: $label, email: $email}) {
    _id
    label
  }
}`

export const queryDeleteLabel=`mutation MyMutation($_id: uuid!) {
  delete_labels_by_pk(_id: $_id) {
    _id
  }
}`

export const queryEditLabel=`mutation MyMutation($_id: uuid!, $label: String!) {
  update_labels_by_pk(pk_columns: {_id: $_id}, _set: {label: $label}) {
    _id
    label
  }
}
`