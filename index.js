const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j9nln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();

        const database = client.db('hi-learning_course');
        const usersCollection = database.collection('users');
        const ordersCollection = database.collection('orders');
        const askDoubtCollection = database.collection('ask_doubt');
        const paidCoursesCollection = database.collection('paid_courses');
        const freeCoursesCollection = database.collection('free_courses');
        const blogsCollection = database.collection('blogs');
        const recursionInPythonCollection = database.collection('recursion_in_python');
        const graphInPythonCollection = database.collection('graph_in_python');
        const queueInPythonCollection = database.collection('queue_in_python');
        const mernStackWebDevelopmentICollection = database.collection('mern_stack_web_development');

        // Add Users API
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const email = await usersCollection.findOne(query);
            if (!email) {
                const result = await usersCollection.insertOne(user);
                res.json(result);
            }
        })

        // Get All The Users API
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });


        // Add Orders API
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.json(result);
        });

        // Get All The Orders API
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        });

        // Add Ask Doubt API
        app.post('/ask_doubt', async (req, res) => {
            const order = req.body;
            const result = await askDoubtCollection.insertOne(order);
            res.json(result);
        });

        // Get All The Ask Doubt API
        app.get('/ask_doubt', async (req, res) => {
            const cursor = askDoubtCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        });


        // Get All The Courses API
        app.get('/paid_courses', async (req, res) => {
            const cursor = paidCoursesCollection.find({});
            const courses = await cursor.toArray();
            res.send(courses);
        });


        // Get All The Free Courses API
        app.get('/free_courses', async (req, res) => {
            const cursor = freeCoursesCollection.find({});
            const freeCourses = await cursor.toArray();
            res.send(freeCourses);
        });


        // Get All The Blogs API
        app.get('/blogs', async (req, res) => {
            const cursor = blogsCollection.find({});
            const blogs = await cursor.toArray();
            res.send(blogs);
        });


        // Add Blogs API
        app.post('/blogs', async (req, res) => {
            const contents = req.body;
            const result = await blogsCollection.insertOne(contents);
            res.json(result);
        })



        // Get MSWD I Contents API
        app.get('/mern_stack_web_development', async (req, res) => {
            const cursor = mernStackWebDevelopmentICollection.find({});
            const contents = await cursor.toArray();
            res.send(contents);
        });


        // Add MSWD I Contents API
        app.post('/mern_stack_web_development', async (req, res) => {
            const contents = req.body;
            const result = await mernStackWebDevelopmentICollection.insertOne(contents);
            res.json(result);
        })


        // Get Recursion Contents API
        app.get('/recursion_in_python', async (req, res) => {
            const cursor = recursionInPythonCollection.find({});
            const contents = await cursor.toArray();
            res.send(contents);
        });


        // Add Recursion Contents API
        app.post('/recursion_in_python', async (req, res) => {
            const contents = req.body;
            const result = await recursionInPythonCollection.insertOne(contents);
            res.json(result);
        })


        // Get Graph in Python Contents API
        app.get('/graph_in_python', async (req, res) => {
            const cursor = graphInPythonCollection.find({});
            const contents = await cursor.toArray();
            res.send(contents);
        });


        // Add Graph in Python Contents API
        app.post('/graph_in_python', async (req, res) => {
            const contents = req.body;
            const result = await graphInPythonCollection.insertOne(contents);
            res.json(result);
        })

        // Get Queue in Python Contents API
        app.get('/queue_in_python', async (req, res) => {
            const cursor = queueInPythonCollection.find({});
            const contents = await cursor.toArray();
            res.send(contents);
        });


        // Add Queue in Python Contents API
        app.post('/queue_in_python', async (req, res) => {
            const contents = req.body;
            const result = await queueInPythonCollection.insertOne(contents);
            res.json(result);
        })


        // Change/Update Role API
        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const updateDoc = { $set: { role: user.role } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });


        // Change/Update Role's Phone No API
        app.put('/users_phone', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const updateDoc = { $set: { phone: user.phone } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });


        // Orders Confirm/Cancel API
        app.put('/orders', async (req, res) => {
            const user = req.body;
            const filter = { TxId: user.TxId };
            const updateDoc = { $set: { status: user.status } };
            const result = await ordersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });


        // After Order Confirm Updating User Enroll API
        app.put('/users_enroll_update', async (req, res) => {
            const user = req.body;
            const filter = { displayName: user.displayName };
            const updateDoc = { $set: { enroll: user.newEnroll } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });


        // After Order Confirm Updating User Batch API
        app.put('/users_batch_update', async (req, res) => {
            const user = req.body;
            const filter = { displayName: user.displayName };
            const updateDoc = { $set: { batch: user.newBatch } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });



        // After Order Confirm/Cancel Updating User Phone No API
        app.put('/users_update_phone', async (req, res) => {
            const user = req.body;
            const filter = { displayName: user.displayName };
            const updateDoc = { $set: { phone: user.phone } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        });


        // Nodemailer API
        app.post('/send-email', async (req, res) => {
            const { data } = req.body;

            // Create a Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.email}`,
                    pass: `${process.env.password}`,
                },
            });

            // Define the email options
            let mailOptions = {};

            if (data.status === "confirmed") {
                mailOptions = {
                    from: `${process.env.email}`,
                    to: data.order_email,
                    subject: 'Confirmation',
                    text: 'This is a confirmation email that your payment is complete and you have successfully enrolled in your course. Enjoy the lessons. Thank you.',
                };
            } else if (data.status === "cancelled") {
                mailOptions = {
                    from: `${process.env.email}`,
                    to: data.order_email,
                    subject: 'Confirmation',
                    text: 'This is a confirmation email that your payment is not completed successfully. There is something mismatch in your order. Please contact us as soon as possible to solve the issue. Thank you.',
                };
            }

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send('Error sending email');
                } else {
                    res.status(200).send('Email sent successfully');
                }
            });
        });

    }

    finally {
        // await client.close();
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('HI-Learning Course server is running')
})

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})