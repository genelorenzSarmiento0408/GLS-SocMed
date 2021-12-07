import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Form } from "react-bootstrap";

export default function ChangeProfilePic() {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data.changeProfile.ProfileUrl),
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadFile({ variables: { file } });
  };
  return (
    <>
      <br />
      <Form.Group className="mb-3">
        <Form.Label className="h3">Change Profile Picture</Form.Label>
        <br />
        <Form.Control
          type="file"
          id="formFile"
          onChange={handleFileChange}
          accept="image/*"
        />
      </Form.Group>
    </>
  );
}

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    changeProfile(file: $file) {
      id
      username
      ProfileUrl
    }
  }
`;
