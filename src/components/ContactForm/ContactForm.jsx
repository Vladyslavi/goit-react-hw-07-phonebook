import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Form, Label, Button, Input } from './ContactForm.styled';

import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { addContacts } from '../../redux/operations';

const nameInputId = nanoid();
const numberInputId = nanoid();

const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();

        const isInContacts = contacts.some(
            contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
        );


        if (isInContacts) {
            alert(`${name} is already in contacts`);
            return;
        }

        dispatch(addContacts({ name, number }));
        setName('');
        setNumber('');
    };

    const handleChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor={nameInputId}>
                Name
                <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </Label>

            <Label htmlFor={numberInputId}>
                Number
                <Input
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </Label>

            <Button type="submit">
                Add contact
            </Button>
        </Form>
    );
};
export default ContactForm;