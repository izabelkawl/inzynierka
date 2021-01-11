import React, { useState, useEffect, Component } from "react";
import api from '../../api';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { insertComment } from "../../api/index";
import Wrapper from '../../components/Wrapper/Wrapper';
import { Form, Button } from 'react-bootstrap';
import { BlueButtonStyle } from '../constants';
import styled from 'styled-components';

const Content = styled.div`
  background-color: white;
  padding: 20px;
  margin: 20px 0;
  -webkit-box-shadow: 0px 8px 18px -8px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 8px 18px -8px rgba(0,0,0,0.1);
  box-shadow: 0px 8px 18px -8px rgba(0,0,0,0.1);
`
const AddComment = styled.div`
    background-color: #ffffff;
    padding: 20px ;
    min-height: content; 
`
const Person = styled.p`
    color: #0071BC;
`

class ForumThread extends Component {
  constructor(props) {
    super(props)
    this.state = {
        id: this.props.match.params.id,
        user_id: '',
        title: '',
        content: '',

        commenter: '',
        comment_content: '',
        forum_id: '',
    }
  }
  
  componentDidMount = async () => {
    const { id } = this.state
    const forum = await api.getForumById(id)

    this.setState({
        user_id: forum.data.data.user_id,
        title: forum.data.data.title,
        content: forum.data.data.content,
    })
  }

      onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
      };

      onSubmit = e => {

        e.preventDefault();
        const newComment = {
          
        commenter: this.props.auth.user.firstname + ' '+ this.props.auth.user.lastname,
        comment_content: this.state.comment_content,
        forum_id: this.props.match.params.id,

        };
        this.props.insertComment(newComment, this.props.history)
    };

  render() {
  
// Comemnt List 
  const CommentsList = () => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const requestCommentsList = async () => {
            const commentsList = await api.getAllComments();
            const { data } = commentsList;
            setComments(data.data);

        };
        requestCommentsList();
    }, []);
  
    const CommentsTable = comments.map((comment, index) => {
      const { _id, commenter, comment_content, forum_id } = comment;
      const timestamp = _id.toString().substring(0,8);
        const date = new Date(parseInt(timestamp ,16)*1000).toLocaleDateString();
       if(forum_id ===this.props.match.params.id ){
      return (
        <Content key={_id}>
            <Person>{commenter}</Person>
            <p>{comment_content}</p>
            <Form.Text muted>{date}</Form.Text>
          </Content>
        );
       }
    });
    return CommentsTable
    }
  
  const { user_id, title, content} = this.state
  const { commenter, comment_content} = this.state
    return (
      <Wrapper>
        <Button style={BlueButtonStyle} href="/dashboard/forums">Powrót</Button>
          <Content>
          <p>{this.props.match.params.id} id posta na chwile pokauje</p>
            <h3>{title}</h3>
            <p>{user_id}</p>
            <hr></hr>
            <p>{content}</p>
            <Form.Text muted>27.11.2020</Form.Text>
          </Content>
            <AddComment>
              <Form>
              <Form.Group>
                <Form.Label muted> {commenter}</Form.Label>
                <Form.Control as="textarea" value={comment_content} id="comment_content"
                    onChange={this.onChange} placeholder="Treść komantarza.." rows={3} />
              </Form.Group>
              <Button style={BlueButtonStyle} onClick={this.onSubmit} size="sm" type="submit">Dodaj Komentarz</Button>
            </Form>
          </AddComment>
          < CommentsList/>
      </Wrapper>
    )
  }
}



const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
    { insertComment }
)(withRouter(ForumThread))

