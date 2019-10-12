import React from 'react';
import {useAlert} from 'react-alert';
import Form from "react-jsonschema-form";
import axios from 'axios';
import './App.css';

const languages = [
    "GoLang", "Java", "Python", "Kotlin", "Swift", "Objective C", "C#", "JavaScript", "Ruby", "Shell Script", "TypeScript", "CSS", "C++", "Rust", "Other"
].sort();

const schema = {
    title: "Hacktoberfest - ThoughtWorks",
    type: "object",
    required: ["pr_link", "language"],
    properties: {
        pr_link: {type: "string", title: "Pull Request Link"},
        language: {type: "string", title: "Language", "enum": languages}
    }
};

const log = (type) => console.log.bind(console, type);

function App() {
    const alert = useAlert();
    return (
        <Form schema={schema}
              onSubmit={async (data) => {
                  console.log(data.formData);
                  try {
                      await axios.post('/api/pr', data.formData);
                      alert.show("Thanks for your contribution");
                  } catch (err) {
                      const {message} = err.response.data || {message: ''};
                      if (message) {
                          alert.show(message);
                      } else alert.show("Unable to save your contribution, please contact the volunteer");
                  }
              }}
              onError={log("errors")}/>
    );
}

export default App;
