import React from 'react';
import Form from "react-jsonschema-form";
import axios from 'axios';
import './App.css';

const languages = [
  "GoLang", "Java", "Python", "Kotlin", "Swift", "Objective C", "C#", "JavaScript", "Ruby", "Shell Script", "TypeScript", "CSS", "C++", "Rust", "Other"
].sort()

const schema = {
  title: "Hacktoberfest - ThoughtWorks Chennai",
  type: "object",
  required: ["pr_link", "language"],
  properties: {
    pr_link: { type: "string", title: "Pull Request Link" },
    language: { type: "string", title: "Language", "enum": languages }
  }
};

const log = (type) => console.log.bind(console, type);

function App() {

  return (
    <Form schema={schema}
      onChange={log("changed")}
      onSubmit={(data) => {
        console.log(data.formData)

        axios.post('/api/pr', data.formData)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });
      }}
      onError={log("errors")} />
  );
}

export default App;
