import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

export default function SimpleModal({width,content,click}) {

    
      
      function getModalStyle() {
        const top = 10 ;
        const left = 10;
      
        return {
          top: `${top}%`,
          
          
        };
      }
    
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  

      const useStyles = makeStyles((theme) => ({
        paper: {
          
          width: width,
          margin:"auto",
          marginTop:"1rem",
          backgroundColor: theme.palette.background.paper,
          border: '2px solid silver',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));

  
      const classes = useStyles();
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {content}
    </div>
  );

  return (
    <div>
     
      <Modal
        open={true}
        onClose={click}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
