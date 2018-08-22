import React, { Component } from 'react';

class ProjectsDropdown extends Component {
  
  render() {
    const { projectItems, projectId } = this.props;

    return (
      <select name="project_id" value={projectId} onChange={this.props.callHandleChange}>
        { projectItems.map(function(item, i){
            return <option key={i} value={item.id}>{item.projectTitle}</option>
        })}
      </select> 
    );
  }
}

export { ProjectsDropdown };