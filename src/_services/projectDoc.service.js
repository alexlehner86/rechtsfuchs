import { authHeader } from '../_helpers';
import { config } from './config';
import { userService } from './user.service';

export const projectDocService = {
    getAll,
    getAllByProjectId,
    getById,
    create,
    update,
    delete: _delete,
    deleteAllByProjectId
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projectdocs`, requestOptions).then(handleResponse);
}

function getAllByProjectId(project_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projectdocs/ofproject/${project_id}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projectdocs/${id}`, requestOptions).then(handleResponse);
}

function create(projectDoc) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(projectDoc)
    };
 
    return fetch(`${config.mongoDB_apiUrl}/projectdocs/create`, requestOptions).then(handleResponse);
}

function update(projectDoc) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(projectDoc)
    };

    return fetch(`${config.mongoDB_apiUrl}/projectdocs/${projectDoc.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projectdocs/${id}`, requestOptions).then(handleResponse);
}

function deleteAllByProjectId(project_id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projectdocs/ofproject/${project_id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}