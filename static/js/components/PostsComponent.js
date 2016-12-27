// in posts.js
import React from 'react';
import { List, Edit, BooleanInput, BooleanField,  Create, Datagrid, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest/lib/mui';
import PostIcon from 'admin-on-rest/node_modules/material-ui/svg-icons/action/book';

export const StreamsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="stream_ip" />
            <BooleanField source="active" />
            <EditButton basePath="/streams" />
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.stream_ip}"` : ''}</span>;
};

export const PostEdit = (props) => (
    <Edit title={PostTitle} {...props}>
        <TextInput source="stream_ip" />
        <BooleanInput source="active"/>
    </Edit>
);

export const PostCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <TextInput source="stream_ip" />
        <BooleanInput source="active"/>
    </Create>
);