// Optimize this React component to prevent unnecessary re-renders
import React, { useMemo, useState } from 'react';

function App({ count }) {
    return <div>{count}</div>;
}

//---> Add your solution here
function App({ count }) {
    const memoizedCount = useMemo(() => count, [])

    return <div>{memoizedCount}</div>;
}

// ------------------------------------
// Refactor this class component into a functional component using hooks
class Counter extends React.Component {
    state = { count: 0 };

    increment = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return <button onClick={this.increment}>{this.state.count}</button>;
    }
}


//---> Add your solution here

function Counter() {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(oldState => oldState + 1)
    }

    return <button onClick={increment}>{count}</button>
}

// ------------------------------------
// Refactor this code using object destructuring
const user = props.user;
const name = user.name;
const age = user.age;

//---> Add your solution here
const { name, age } = props.user

// ------------------------------------
// Identify issues and propose improvements
function fetchData() {
    let data;
    fetch('/api/data')
        .then((response) => {
            data = response.json();
        });
    return data;
}

//---> Add your solution here
function fetchData() {
    let data;
    fetch('/api/data')
        .then((response) => {
            //add loader state

            data = response.json();
        }).catch(error => {
            //show error feedback
        }).finally(() => {
            //finishes the loading state
        });
    return data;
}

// ------------------------------------
// Review the following API implementation for a password reset functionality:
// - Identify security flaws in the implementation.
// - Rewrite the function to address these flaws.
// - Describe how you would test this functionality for vulnerabilities.
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).send('User not found');
    user.password = newPassword;
    await saveUser(user);
    res.send('Password updated successfully');
});

//---> Add your solution here   
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    if(!email) return res.status(400).send('empty email')
    if(!newPassword) return res.status(400).send('empty password')

    const user = await getUserByEmail(email);

    if (!user) return res.status(404).send('User not found');
    
    // pass a crypto function in this password
    user.password = newPassword;

    await saveUser(user);

    res.send('Password updated successfully');
});
