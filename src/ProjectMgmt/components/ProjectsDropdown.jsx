import React, { Component } from 'react';

class ProjectsDropdown extends Component {
  
  render() {
    const { projects, projectId } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="project">Im Projekt-Ordner</label><br />
        <select name="project_id" value={projectId} onChange={this.props.handleChange}>
          { projects.map(function(item, i){
              return <option key={i} value={item.id}>{item.projectTitle}</option>
          })}
        </select>
      </div>
    );
  }
}

export { ProjectsDropdown };