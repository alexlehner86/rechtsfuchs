import { authHeader } from '../_helpers';
import { config } from './config';
import { userService } from './user.service';
import { ListOfRIS_Projects } from '../_helpers';

export const projectService = {
    getAll,
    getAllByUsername,
    getById,
    create,
    update,
    delete: _delete,
    deleteAllByUsername
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projects`, requestOptions).then(handleResponse);
}

function getAllByUsername(username) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projects/ofuser/${username}`, requestOptions)
           .then(response => handleResponse(response, create_RIS_ProjectList));
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projects/${id}`, requestOptions).then(handleResponse);
}

function create(project) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    };
 
    return fetch(`${config.mongoDB_apiUrl}/projects/create`, requestOptions).then(handleResponse);
}

function update(project) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    };

    return fetch(`${config.mongoDB_apiUrl}/projects/${project.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projects/${id}`, requestOptions).then(handleResponse);
}

function deleteAllByUsername(username) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.mongoDB_apiUrl}/projects/ofuser/${username}`, requestOptions).then(handleResponse);
}

function handleResponse(response, processDataFunction) {
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

        if (processDataFunction) return processDataFunction(data);
        else return data;
    });
}

function create_RIS_ProjectList(projectsArray) {
    return new ListOfRIS_Projects(projectsArray);
}