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
    pr_link: {type: "string", title: "Pull Request Link"},
    language: {type: "string", title: "Language", "enum": languages}
  }
};

const log = (type) => console.log.bind(console, type);

function App() {

  return (
    <Form schema={schema}
    onChange={log("changed")}
    onSubmit={(data) => {
      const prLink = data.formData.pr_link.trim().replace(/ +/g, "-")
      const language = data.formData.language.trim().replace(/ +/g, "-")

      console.log(prLink)
      console.log(language)

      const body = `pull_request,pr_link=${prLink},language=${language} value=1`
      axios({
        method: 'post',
        url: 'https://contributions.hacktoberfest.thecasualcoder.in/api/write?db=hacktober_metrics',
        data: body,
        })
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