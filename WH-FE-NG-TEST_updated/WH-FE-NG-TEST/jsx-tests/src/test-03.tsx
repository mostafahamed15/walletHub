/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse',
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px',
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px',
    },
    inputs: {
      marginBottom: '5px',
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px',
    },
  },
  phone: {
    appearance: 'none',
    webkitAppearance: 'none',
    margin: 0,
    mozAppearance: 'textfield',
    marginBottom: '5px',
  },
} as const;

interface formValues {
  userFirstname: string;
  userLastname: string;
  userPhone: number;
}

function PhoneBookForm({ addEntryToPhoneBook }) {
  const initialValue: formValues = {
    userFirstname: 'Coder',
    userLastname: 'Byte',
    userPhone: 8885559999,
  };
  const [inputs, setInputs] = useState<formValues>(initialValue);
  const onChangeHandler = useCallback(
    ({ target: { name, value } }) =>
      setInputs((state) => ({ ...state, [name]: value })),
    []
  );

  const submitFunc = (e) => {
    e.preventDefault();
    addEntryToPhoneBook(inputs);
    setInputs(initialValue);
  };
  return (
    <form onSubmit={submitFunc} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        required
        onChange={onChangeHandler}
        value={inputs.userFirstname}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        required
        onChange={onChangeHandler}
        value={inputs.userLastname}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.phone}
        className="userPhone"
        name="userPhone"
        type="number"
        required
        onChange={onChangeHandler}
        value={inputs.userPhone}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable(props) {
  props.entries.sort((a: formValues, b: formValues) =>
    a.userLastname.localeCompare(b.userLastname)
  );
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {props.entries.map((entry: formValues) => (
          <tr>
            <td>{entry.userFirstname}</td>
            <td>{entry.userLastname}</td>
            <td>{entry.userPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application() {
  const [entries, setEntries] = useState<formValues[]>([]);
  const [errorMassege, setErrorMassege] = useState<string>('');
  const addEntry = (user: formValues) => {
    if (entries.find((entry) => user.userPhone === entry.userPhone)) {
      setErrorMassege('The phone Exist before!!!');
    } else {
      setEntries([...entries, user]);
      setErrorMassege('');
    }
  };
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntry} />
      {errorMassege ? <h5 style={{ color: 'red' }}>{errorMassege}</h5> : null}
      <InformationTable entries={entries} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById('test-03'));
