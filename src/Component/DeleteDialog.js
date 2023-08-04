import React from 'react';
import { Dialog, DialogTitle,DialogContentText, DialogContent, DialogActions, Button } from '@material-ui/core';

//Delete dialog button handling
const DeleteDialog = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle><strong>Delete Contact</strong></DialogTitle>
      <DialogContent>
        <DialogContentText>
        Are you sure, you want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant ='contained'>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant ='contained'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
