import React from 'react';
import { render } from 'react-dom';
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';

import { StreamsList, PostEdit, PostCreate, PostIcon } from './PostsComponent.js';


var RESTAdminComponent = React.createClass({

   render: function(){
       return (
        <Admin restClient={simpleRestClient('http://127.0.0.1:8080/api')}>
            <Resource name="streams" list={StreamsList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
        </Admin>
       )
   }
});


export default RESTAdminComponent;