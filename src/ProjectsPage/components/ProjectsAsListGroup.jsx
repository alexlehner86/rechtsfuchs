import React, { Component } from 'react';
import { ProjectListGroupItem } from './';
import { ListGroup } from 'react-bootstrap';

class ProjectsAsListGroup extends Component {
  render() {
    const { projects, selectedProjectID } = this.props;

    return (
      <ListGroup>
        {projects.map(function(item, i){
          if (selectedProjectID === item.id) {
            return <ProjectListGroupItem project={item} key={i} isSelected={true} />;
          } else {
            return <ProjectListGroupItem project={item} key={i} isSelected={false} />;
          }
        })}  
      </ListGroup>
    );
  }
}

export { ProjectsAsListGroup };