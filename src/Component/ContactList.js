import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactContext } from '../Context/ContactContext';
import {Icon,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Box,IconButton,Typography,Dialog,DialogTitle,DialogContent,Card,Img} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContactForm from './ContactForm';
import DeleteContact from './DeleteContact';
import SearchContact from './SearchContact';



function ContactList() {
  const navigate = useNavigate();
  const { contacts } = useContext(ContactContext);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if (selectedContact) {
      setEditDialogOpen(true);
    } else {
      setEditDialogOpen(false);
    }
  }, [selectedContact]);

  const handleCancelEdit = () => {
    setSelectedContact(null);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const filteredContacts = searchKeyword
    ? contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : contacts;

  return (
    <div>
      <div>
      <Box display="flex" alignItems="left" marginTop={2} marginBottom={2} marginLeft={2}>
        <Button type="button" size="medium" variant="contained"  onClick={() => navigate('/')}>
          Create Contact
        </Button>
        <SearchContact onSearch={handleSearch} style={{ marginLeft: '8px' } } />
      </Box>
      
      {filteredContacts.length === 0 ? (
        
        // <Typography variant="body1" style={{ marginTop: '200px', fontSize: '25px' }}  align='center'>
        //   
        //   <img src={'./src/Component/NoRecordImg.png'} alt="No Records Found" />
        //   </Typography>
        <Typography variant="body1" style={{ marginTop: '200px', fontSize: '25px' }} align='center'>
        No Records Found      
        </Typography>
      ) : (
        <TableContainer component={Box} align='center' marginLeft={15} marginRight={15} marginTop={10}>
          <Table style={{
            
        width: '85%',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
      }}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts.map((contact, index) => (
                <TableRow key={index} scope="row">
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    <DeleteContact contactId={contact.id}>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </DeleteContact>
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="Edit" onClick={() => setSelectedContact(contact)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </div>
      <div>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit} maxWidth="md" PaperProps={{ sx: { width: '650px', height: '500px' }}} >
        
        <DialogTitle><strong>Edit Contact</strong></DialogTitle>

        <DialogContent>
         {/* <div
        style={{
        height: '480px',
        width: '800px',
      }}> */}
       <ContactForm contact={selectedContact} onCancel = {handleCancelEdit}/>
        {/*  */}
        {/* </div> */}
        </DialogContent>
        
      </Dialog>
      </div>
    </div>
  );
}

export default ContactList;
