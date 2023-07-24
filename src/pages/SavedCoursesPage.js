import React,{useState,useEffect,useRef} from 'react'
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { styled } from '@mui/system';
import { findDOMNode } from 'react-dom'
import { useNavigate } from 'react-router-dom';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Avatar from '@mui/material/Avatar';

import samplePdf from 'src/assets/images/sample.pdf'
import profile from 'src/assets/images/profile.jpeg'
import math from 'src/assets/images/math.jpeg'
import chem from 'src/assets/images/chembeak.jpeg'
import chem2 from 'src/assets/images/chem2.jpeg'
import biology from 'src/assets/images/biology.jpeg'
import english from 'src/assets/images/english.jpeg'
import philosophy from 'src/assets/images/philoslib.jpeg'
import ReactPlayer from 'react-player'
import { Document, Page ,pdfjs} from 'react-pdf';
import { MobilePDFReader,PDFReader } from 'react-read-pdf';

import LogoSwitch from './LogoSwitch';

import {AiOutlineDownload} from "react-icons/ai";

import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import Modal from '@mui/material/Modal';


import { useLiveQuery } from 'dexie-react-hooks';
import db from '../browserDb/db'



function SavedCoursesPage() {
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    height:"90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 




  const topics = [
    {title:"Chemie ",author:"Sidiki...",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem2},
    {title:"Anglais ",author:"Kabinet...",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie ",author:"Elhadj... ",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie",author:"Sidiki...",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques",author:"Fode...",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie",author:"Sidiki...",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
  ]

/*DEXIE MANIPULATION LOGIC */
//const friends = useLiveQuery(() => db.friends.toArray(),[]);

/*DEXIE MANIPULATION LOGIC END */


/*PDF MANIPULATION LOGIC*/
  const [numPages, setNumPages] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(/*{ numPages }*/) {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

/*PDF MANIPULATION LOGIC END */

/*MODAL MANIPULATION LOGIC */

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {doVideoActions()}
  const handleClose = () => {setOpen(false);setVideoTime(false)};


  const [openPdf, setOpenPdf] = React.useState(false);
  const handleOpenPdf = () => {setOpenPdf(true)}
  const handleClosePdf = () => {setOpenPdf(false)};

/*MODAL MANIPULATION LOGIC */


 /*video manipulation logic */
 
  const [videoTime,setVideoTime] = useState(false)
  const [fullScreen, setFullScreen] = useState(false);


  
  const videoRef = useRef(true)
 

  const handleEsc = (event) => {
   
    window.removeEventListener('fullscreenchange', handleEsc)
    setTimeout(()=>{setOpen(false); setFullScreen(!fullScreen); setVideoTime(false)},10)
    
  };


  const doVideoActions = () => {
    setOpen(true)
    
    setTimeout(
     ()=> {
    
    setVideoTime(!videoTime)
    
     if(!videoTime){
      findDOMNode(videoRef.current).requestFullscreen()
      }
    },10) 

    setTimeout(()=>(window.addEventListener('fullscreenchange', handleEsc)),1000)
  }

  
  
  
  useEffect(()=>{
 
    if(open === false){
      setTimeout(()=>(window.removeEventListener('fullscreenchange', handleEsc)),10)
    }

  },[open])

  /*video manipulation logic end */

 






  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray",fontSize:"0.85rem"}}> 






     {/*PDF MODAL */}
    <Modal
        open={openPdf}
        onClose={handleClosePdf}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           
       <MobilePDFReader isShowHeader={false} isShowFooter={false} url={samplePdf}/>
     
      
        </Box>
  </Modal>

     {/*VIDEO MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
         <ReactPlayer   
                width="100%"
                height="100%"
                id="full-screenVideo"                                              
                className="videoFrame"
                url={"https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Shadow.mp4"}
                //light={thumbnail}
                playing={true}
                playIcon={' '}
                controls
                ref={videoRef}
              //onClickPreview = {()=>{setTouch(false);}}
               
             />
        </Box>
      </Modal>
    

   
   
   

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem"}}>
    <center>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",borderBottom:"3px solid red",width:"max-content"}}>Cours Enregistrés</p>
    </center>
    </Grid>

  <Grid container xs={12} style={{paddingTop:"1.5rem"}}>
   
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
      Chimie Terminales
    
     </p>
    
    </Grid>
    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}><LogoSwitch/> &nbsp; 1.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p  style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}><LogoSwitch/> &nbsp; 2.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}} ><LogoSwitch/> &nbsp; 3.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p  style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}><LogoSwitch/> &nbsp; 4.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}><LogoSwitch/> &nbsp; 5.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}} ><LogoSwitch/> &nbsp; 6.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>


   


   </Grid>


   <Grid container xs={12} style={{paddingTop:"1.5rem"}}>
   
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",display: 'flex',marginLeft:"0.4rem", justifyContent: 'space-between',fontWeight:"bold",fontSize:"1rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
      Histoire Terminales
    
     </p>
    
    </Grid>
    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p ><PlayCircleFilledWhiteIcon  onClick={handleOpen} style={{color:"red",fontSize:"1.6rem"}}/> &nbsp; 1.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>

   
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p ><PlayCircleFilledWhiteIcon  onClick={handleOpen} style={{color:"red",fontSize:"1.6rem"}}/> &nbsp; 2.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>




   
   </Grid>
       

</Container>
    </>
  );
}

export default SavedCoursesPage;