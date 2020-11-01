import * as React from 'react';
import "./FormA.css"

export interface IFormAProps {
}

interface IForm {
    name: string;
    bio: string;
    os: string;
}

const defaultForm: IForm = {
    name: '',
    bio: '', 
    os: ''
}

export function FormA (props: IFormAProps) {
    const [form, setForm] = React.useState<IForm>(defaultForm);

    const onSubmitHandler = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("Form:", form);
        fetch("https://localhost:7443/api/alpha", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        }).then(response => console.log(response))
        .then(data => console.log("Success:", data))
        .catch(ex => console.log("Error:", ex))
    }

    const onChangeFormElement = (event: React.ChangeEvent<HTMLElement>) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case "name":
                setForm({...form, name: (event.target as HTMLInputElement).value});
                break;
            case "bio":
                setForm({...form, bio: (event.target as HTMLInputElement).value});
                break;
            case "os":
                setForm({...form, os: (event.target as HTMLInputElement).value});
                break;
            default:
        }
        console.log(form);
    }

    return (
    <div>
        <form onSubmit={onSubmitHandler} className="formA">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={form.name} onChange={onChangeFormElement}></input>
            <br/>
            <label htmlFor="bio">Biodata</label>
            <textarea id="bio" value={form.bio} onChange={onChangeFormElement}/>
            <br/>
            <label>
                Pick your os:
                <select id="os" value={form.os} onChange={onChangeFormElement}>
                    <option value=""></option>
                    <option value="linux">Linux</option>
                    <option value="windows">Windows</option>
                </select>
            </label><br/>
            <input type="submit"/>
        </form>      
    </div>
  );
}
