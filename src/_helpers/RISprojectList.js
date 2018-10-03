class RIS_Project {
    constructor(project) {
        this.id = project.id;
        this.createdDate = project.createdDate;
        this.description = project.description;
        this.numberOfDocs = project.numberOfDocs;
        this.projectTitle = project.projectTitle;
        this.username = project.username;
    }
}

class ListOfRIS_Projects {
    constructor(projectsArray) {
        if (projectsArray) {
            this.projects = projectsArray.map(project => {
                return new RIS_Project(project);
            });
        } else {
            this.projects = [];
        }
        this.selectedSortFunction = this.sortAlphabeticallyByProjectTitle;

        this.sortProjects();
    }

    isEmpty() {
        return this.projects.length === 0;
    }

    sortProjects() {
        this.projects.sort(this.selectedSortFunction);
    }

    sortAlphabeticallyByProjectTitle(a, b) {
        if (a.projectTitle.toUpperCase() > b.projectTitle.toUpperCase()) {
            return 1;
        }
        if (a.projectTitle.toUpperCase() < b.projectTitle.toUpperCase()) {
            return -1;
        }
        // if a equals b
        return 0;
    }

    updateProject(updatedProject) {
        this.projects = this.projects.map(project =>
            project.id === updatedProject.id
              ? updatedProject
              : project
          )
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(project => project.id !== projectId);
    }

    getProjectById(projectID) {
        return this.projects.find( project => project.id === projectID );
    }
}

export { ListOfRIS_Projects };