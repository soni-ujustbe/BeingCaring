import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import firebaseApp from '../firebaseConfig';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, deleteDoc, arrayUnion, getDoc,Timestamp, updateDoc, query } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import Link from 'next/link'
import zoomlogo from '../public/images/zoom.png'
import Header from "../component/module/Header"
const db = getFirestore();

//Image import
import topbannerimg from '../public/images/topbanner.png';
import walogo from '../public/images/whatsapp.png'



const threecheckdata = [

    { name: "Relationship with Self" },
    { name: "Relationship with people relevant to you" },
    { name: "Relationship with your own health " },
    { name: "Relationship with your own wealth" },
    
];

const PostForm = () => {

    //state used for form
    const [phoneNum, setphoneNum] = useState('')
    const [username, setusername] = useState('')
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [singleUsers, setsingleUsers] = useState('');
    const [singleAdminUsers, setsingleAdminUsers] = useState('');

    const [onecheck, setoneCheck] = useState('');
    const [twocheck, setTwoCheck] = useState('');
    const [threecheck, setThreeCheck] = useState(threecheckdata);
    // const [threecheck, setThreeCheck] = useState('');
    const [fourcheck, setFourCheck] = useState([]);
    const [fivecheck, setFiveCheck] = useState('');

    const [sixcheck, setSixCheck] = useState('');

    const [oneQuestionInput, setOneQuestionInput] = useState("");
    const [twoQuestionInput, setTwoQuestionInput] = useState("");

   
    const [UserData, setUserData] = useState([]);
    const [userId, setuserId] = useState('');
    const [error, seterror] = useState(false);
    const [formsubmit, setformsubmit] = useState(false)

    const [postfeedbackImg, setpostfeedbackImg] = useState('')
    const [mobileFormbg, setmobileFormbg] = useState('')
    const [eventName, seteventName] = useState('')
    const [secondInput, setsecondInput] = useState("");
    const [second, setsecond] = useState(false);
    const [whatsappgroup, setwhatsappgroup] = useState("");
    const [formbgImage, setformbgImage] = useState("");




    //function for add data in firebase
    const CreatForm = async (event) => {
        event.preventDefault();

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);

        const data = {

            username: username,
            phoneNum: phoneNum,
            PostOneAns: onecheck,
            PostOneInput:oneQuestionInput,
            PostTwoAns: twocheck,
            PostTwoInput:twoQuestionInput,
            PostThreeAns: threecheck,
            PostFourAns: fourcheck,
            PostFiveAns: fivecheck,
            PostSixAns:sixcheck,
            preFormSubmit: true,
            postfeedbackImg: postfeedbackImg,
            createdBy:Timestamp.now(),


        };

        //if user empty throw error else merge the form data in firebase
          //if user empty throw error else merge the form data in firebase
        if (onecheck==="" || twocheck==="" || threecheck==="" || fourcheck==="" || fivecheck==="" || sixcheck==="")
        {
            seterror(true);
            setFiveCheck(fivecheckdata);
            setSixCheck(sixcheckdata);
        }
        else {
            const isLogin = localStorage.getItem("ucore");
            const usersDetails = JSON.parse(isLogin);

            setpostfeedbackImg();
            const docRef = doc(db, usersDetails.eventName, phoneNum);

            await setDoc(docRef, data, { merge: true });
           
            console.log("Feedback data", data);

            setformsubmit(true);

        }

        //clear all field after submit the data
        setoneCheck("");
        setOneQuestionInput("");
        setTwoCheck("");
        setTwoQuestionInput("");
        setThreeCheck("")
        setFourCheck("");
        setFiveCheck(fivecheck);
        setSixCheck(sixcheck);
        // setformbgImage("");
        // setwhatsappLink("");
        //   Router.push('/dashboard');
    }

    //target checked data for store in firestore

    const questionOne = (event) => {
        const target = event.target;
        if (target.checked) {
            setoneCheck(target.value);
            console.log(event.target.value);
        }

    };

    const questionTwo = (event) => {
        const target = event.target;
        if (target.checked) {
            setTwoCheck(target.value);
            console.log(event.target.value);
        }

    };

    // const questionThree = (event) => {
    //     const target = event.target;
    //     if (target.checked) {
    //         setThreeCheck(target.value);
    //         console.log(event.target.value);
    //     }
    // };

    const questionFour = (event) => {
        const target = event.target;
        if (target.checked) {
            setFourCheck(target.value);
            console.log(event.target.value);
        }
    };



    const questionThree = (event) => {
        const {name,checked}= event.target;
    //     if(name === "AllSelect"){
    //       let tempSevenData=sevencheck.map((sevendetails)=>{
    //             return {...sevendetails, isChecked:checked}  });
    //         setSevenCheck(tempSevenData);

    //     }
    //    else{
        let tempSixData=threecheck.map((sixdetails)=>
        sixdetails.name === name ? { ...sixdetails, isChecked:checked } : sixdetails);
        setThreeCheck(tempSixData)

        console.log("sixquestion",threecheck);
    //    }
       
        // const target = event.target;
        // if (target.checked) {
        //     setSevenCheck(target.value);
        //     console.log(event.target.value);
        // }

    };

    const questionFive = (event) => {
        const target = event.target;
        if (target.checked) {
            setFiveCheck(target.value);
            console.log(event.target.value);
        }
    };
    const questionSix = (event) => {
        const target = event.target;
        if (target.checked) {
            setSixCheck(target.value);
            console.log(event.target.value);
        }
    };


    

    useEffect(() =>{
       
        setThreeCheck(threecheckdata);

    },[])

    useEffect(() => {
        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);

        console.log(usersDetails.username);
        console.log(usersDetails.phoneNum);
        setusername(usersDetails.username);
        setphoneNum(usersDetails.phoneNum);
        seteventName(usersDetails.eventName);
        
        const eventName = usersDetails.eventName;
        // console.log(eventName);

        setLoading(true);

        const getContent = async () => {

            onSnapshot(collection(db, eventName), (snapshot) => {
                console.log("MMform", snapshot);

            });
        }
        const getsingleDoc = async () => {

            const isLogin = localStorage.getItem("ucore");
            const usersDetails = JSON.parse(isLogin);
            console.log(usersDetails);
            const FormEventName = usersDetails.eventName;
            const FormPhoneNumber = usersDetails.phoneNum;
    
    
            const docRef = doc(db, FormEventName, FormPhoneNumber);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());

            // if (docSnap.exists()) {
            //     setsingleUsers(docSnap.data());
            //     console.log(singleUsers);
            //     console.log("Document data:", docSnap.data());
            //     setpostfeedbackImg(docSnap.data().formImgUrls);
            //     setmobileFormbg(docSnap.data().mobileUrls);
            //     seteventName(docSnap.data().eventName);
            //     setwhatsappgroup(docSnap.data().whatsappLink);
            //     console.log(docSnap.data().whatsappLink);


            // } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            // }

            if (docSnap.exists()) {
                setsingleUsers(docSnap.data());
                console.log("Single users" + singleUsers);
                console.log("single Document data:", docSnap.data());
                setpostfeedbackImg(docSnap.data().formImgUrls);
                setmobileFormbg(docSnap.data().mobileUrls);
                seteventName(docSnap.data().eventName);
                setwhatsappgroup(docSnap.data().whatsappLink);
                const prefillformsubmit = docSnap.data().preFormSubmit;
                if (prefillformsubmit) {
    
                    Router.push("/dashboard");
                } else {
    
                    // alert("kindly fill the form");
                }
    
    
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }
        const getSingleAdminDoc = async () => {

            const isLogin = localStorage.getItem("ucore");
            const usersDetails = JSON.parse(isLogin);
            console.log(usersDetails);
    
            const docRef = doc(db, "AdminMonthlyMeet", eventName);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setsingleAdminUsers(docSnap.data());
                console.log(singleAdminUsers);
                console.log("Admin Document data:", docSnap.data());
                //   console.log("Admin Document data:", docSnap.data().formimage);
                setformbgImage(docSnap.data().formImgUrls);
                setmobileFormbg(docSnap.data().mobileUrls);
                setwhatsappgroup(docSnap.data().whatsappLink);
                seteventName(docSnap.data().eventName);
                console.log(docSnap.data().whatsappLink);
    
                console.log(eventName);
    
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
    
    
    
        }

        
        // getContent();
        getsingleDoc();
        getSingleAdminDoc();
    }, []);


    return (
      <>

            <Header/>
            <section className="c-containerForm">

                <div className='topbanner'>
                    <img className='desktopFormbg' src={postfeedbackImg} />
                    <img className='mobileFormbg' src={mobileFormbg} />
                    {/* <Image src={topbannerimg} placeholder="blur" alt='logo' /> */}

                    

                    {/* <div class="topbanner-navbar ">
                        <div class="topnav">
                            <a href="#home">Home</a>
                            <a href="#news">Feedback</a>
                            <a href={"userprofile/[upid]"} as={"userprofile/" + phoneNum}>Profile</a>
                            <a href="#about">Logout</a>
                        </div>
                    </div> */}
                    <div className="bannertext">
                        <h1>{eventName}</h1>
                    </div>
                </div>

                {/* form start  */}

                {
                    formsubmit ? <div className="sucess">
                    <h2> Thank you for sharing your responses.</h2>
                    <h4> Kindly join the WhatsApp Group </h4>
                    <p>testing</p>
                    <div className='whatsappLink'>
                        <div className='walogo'>
                            <Image src={walogo} layout='responsive' />
                        </div>
                        <Link href={whatsappgroup} ><a className="whatsappbtn">Join WhatsApp Group</a></Link>
                    </div>
                    <Link href="/dashboard" ><a className="homelink">Go back to home to get zoom meeting link</a></Link>
                </div> : <div>
                        <form>
                            {/* {
                        error?<div className="error"><p>required</p></div>:null
                        } */}
                            <div className="form-row">
                                <ul className="form-textfield">
                                <label>Name</label>
                                    <li>
                                        <input type="text"
                                            value={username}
                                            name="username"
                                            disabled
                                            onChange={(event) => {
                                                setusername(event.target.value)
                                            }} />

                                    </li>

                                </ul>
                            </div>
                            
                            <div className="form-row">
                                <ul className="form-textfield">
                                    <label>Phone Number</label>
                                    <li>
                                        <input type="text"
                                            value={phoneNum}
                                            name="phonenumber"
                                            disabled
                                            onChange={(event) => {
                                                setphoneNum(event.target.value)
                                            }} />

                                    </li>

                                </ul>
                            </div>

                               {/* 1st question */}
                               <div className="form-row radio-buttons">
                                <h2>1. Are you 'Authentic' every time with self and others?<sup>*</sup> </h2>

                                <ul>
                                    <li>
                                        <label htmlFor="1A">
                                            <input
                                                id="1A"
                                                value="Yes"
                                                name="questionOne"
                                                type="radio"
                                                onChange={questionOne}
                                                checked={onecheck == 'Yes'} />
                                            <div className='custom_radio'></div>
                                            Yes
                                        </label>

                                    </li>

                                    <li>
                                        <label htmlFor="1B">
                                            <input
                                                id="1B"
                                                value="No"
                                                name="questionOne"
                                                type="radio"
                                                onChange={questionOne}
                                                checked={onecheck == 'No'} />
                                            <div className='custom_radio'></div>
                                            No </label>
                                    </li>

                                    {onecheck==="No" && (  <li>
                                        <input type="text"
                                             id="oneInput"
                                            value={oneQuestionInput}
                                            name="questionOne"
                                            placeholder='Share reason'
                                            required
                                            onChange={(event) => {
                                                setOneQuestionInput(event.target.value)
                                            }} />
                                </li> )}
                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>                           


                            {/* 2nd question */}
                            <div className="form-row radio-buttons">
                                <h2>2. You believe that Authenticity is _____________ value.<sup>*</sup></h2>

                                <ul>
                                    <li>
                                        <label htmlFor="2A">
                                            <input
                                                id="2A"
                                                value="Must to have"
                                                name="questionTwo"
                                                type="radio"
                                                onChange={questionTwo}
                                                checked={twocheck == 'Must to have'} />
                                            <div className='custom_radio'></div>
                                            Must to have
                                        </label>

                                    </li>

                                    <li>
                                        <label htmlFor="2B">
                                            <input
                                                id="2B"
                                                value="Nice to have"
                                                name="questionTwo"
                                                type="radio"
                                                onChange={questionTwo}
                                                checked={twocheck == 'Nice to have'} />
                                            <div className='custom_radio'></div>
                                            Nice to have </label>
                                    </li>

                                    {/* {twocheck==="Yes" && (  <li>
                                        <input type="text"
                                             id="twoInput"
                                            value={twoQuestionInput}
                                            name="questionTwo"
                                            placeholder='Share your 2 constraints'
                                            required
                                            onChange={(event) => {
                                                setTwoQuestionInput(event.target.value)
                                            }} />
                                </li> )} */}

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>


                            {/* 3rd question */}
                            {/* <div className="form-row radio-buttons">
                                <h2>3. Which one of the below constraints which you think that you can work upon yourself without anybody’s help?<sup>*</sup> </h2>
                                <ul>

                                    <li>
                                        <label htmlFor="3A">
                                            <input
                                                id="3A"
                                                value="Amygdala Hijack"
                                                name="questionThree"
                                                type="radio"
                                                onChange={questionThree}
                                                checked={threecheck == 'Amygdala Hijack'} />
                                            <div className='custom_radio'></div>
                                            Amygdala Hijack</label>
                                    </li>

                                    <li>
                                        <label htmlFor="3B">
                                            <input
                                                id="3B"
                                                value="Change Blindness"
                                                name="questionThree"
                                                type="radio"
                                                onChange={questionThree}
                                                checked={threecheck == 'Change Blindness'} />
                                            <div className='custom_radio'></div>
                                            Change Blindness</label>
                                    </li>

                                    <li>
                                        <label htmlFor="3C">
                                            <input
                                                id="3C"
                                                value="Already-Always Listening"
                                                name="questionThree"
                                                type="radio"
                                                onChange={questionThree}
                                                checked={threecheck == 'Already-Always Listening'} />
                                            <div className='custom_radio'></div>
                                            Already-Always Listening</label>
                                    </li>

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div> */}

                            {/* 6th question */}
                            <div className="form-row radio-buttons">
                                <h2>3. In which of the below mentioned areas you think that Authenticity is MUST to have ? <sup>*</sup> </h2>
                                <ul>

                                   
                                <li className='checkbox-style'>
                                        {threecheck && threecheck.map((sixdata)=>(
                                        <>

                                        <div > 
    
                                                    <input

                                                        id={sixdata.name}
                                                        value={sixdata}
                                                        name={sixdata.name}
                                                        checked={sixdata?.isChecked || false }
                                                        type="checkbox"
                                                    
                                                        onChange={questionThree} />
                                                
                                                    <label  className='checkbox-label' htmlFor={sixdata.name}> {sixdata.name} </label>
                                        </div>
                                        </>
                                        ))}
                                    </li>
                                 


                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>

                            {/* 4th question */}
                            <div className="form-row radio-buttons">
                                <h2>4. According to you, Authenticity is about<sup>*</sup></h2>
                                <ul>

                                    <li>
                                        <label htmlFor="4A">
                                            <input
                                                id="4A"
                                                value="Always being honest "
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'Always being honest '} />
                                            <div className='custom_radio'></div>
                                            Always being honest   </label>
                                    </li>

                                    <li>
                                        <label htmlFor="4B">
                                            <input
                                                id="4B"
                                                value="Always speaking truth"
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'Always speaking truth'} />
                                            <div className='custom_radio'></div>
                                            Always speaking truth </label>
                                    </li>

                                    <li>
                                        <label htmlFor="4C">
                                            <input
                                                id="4C"
                                                value="Always saying and doing what you think "
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == 'Always saying and doing what you think '} />
                                            <div className='custom_radio'></div>
                                            Always saying and doing what you think  </label>
                                    </li>

                                    <li>
                                        <label htmlFor="4D">
                                            <input
                                                id="4D"
                                                value=" All of the Above "
                                                name="questionFour"
                                                type="radio"
                                                onChange={questionFour}
                                                checked={fourcheck == ' All of the Above '} />
                                            <div className='custom_radio'></div>
                                            All of the Above   </label>
                                    </li>

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>

                            {/* checkbox */}


                             {/* 5th multiple check box */}
                             <div className="form-row radio-buttons">
                                <h2>5. Given an opportunity, in which area will you like to authentically contribute in UJustBe?<sup>*</sup></h2>
                                <ul>

                                    <li>
                                        <label htmlFor="5A">
                                            <input
                                                id="5A"
                                                value="Helping people to improve relationships"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'Helping people to improve relationships'} />
                                            <div className='custom_radio'></div>
                                            Helping people to improve relationships</label>
                                    </li>

                                    <li>
                                        <label htmlFor="5B">
                                            <input
                                                id="5B"
                                                value="Sharing tips for being healthy"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'Sharing tips for being healthy'} />
                                            <div className='custom_radio'></div>
                                            Sharing tips for being healthy</label>
                                    </li>

                                    <li>
                                        <label htmlFor="5C">
                                            <input
                                                id="5C"
                                                value="Helping partners to identify referrals"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'Helping partners to identify referrals'} />
                                            <div className='custom_radio'></div>
                                            Helping partners to identify referrals</label>
                                    </li>

                                    <li>
                                        <label htmlFor="5D">
                                            <input
                                                id="5D"
                                                value="Enrolling own Connects to become Partner"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'Enrolling own Connects to become Partner'} />
                                            <div className='custom_radio'></div>
                                            Enrolling own Connects to become Partner</label>
                                    </li>

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>

                            {/* 6th question */}
                            <div className="form-row radio-buttons">
                                <h2>6. Which of the below roles that you play in UJustBe requires Authenticity?  <sup>*</sup></h2>
                                <ul>

                                    <li>
                                        <label htmlFor="6A">
                                            <input
                                                id="6A"
                                                value="Partner"
                                                name="questionSix"
                                                type="radio"
                                                onChange={questionSix}
                                                checked={sixcheck == 'Partner'} />
                                            <div className='custom_radio'></div>
                                            Partner</label>
                                    </li>

                                    <li>
                                        <label htmlFor="6B">
                                            <input
                                                id="6B"
                                                value="Listed Partner"
                                                name="questionSix"
                                                type="radio"
                                                onChange={questionSix}
                                                checked={sixcheck == 'Listed Partner'} />
                                            <div className='custom_radio'></div>
                                            Listed Partner</label>
                                    </li>

                                    <li>
                                        <label htmlFor="6C">
                                            <input
                                                id="6C"
                                                value="Mentor"
                                                name="questionSix"
                                                type="radio"
                                                onChange={questionSix}
                                                checked={sixcheck == 'Mentor'} />
                                            <div className='custom_radio'></div>
                                            Mentor</label>
                                    </li>

                                    <li>
                                        <label htmlFor="6D">
                                            <input
                                                id="6D"
                                                value=" All of the Above "
                                                name="questionSix"
                                                type="radio"
                                                onChange={questionSix}
                                                checked={sixcheck == ' All of the Above '} />
                                            <div className='custom_radio'></div>
                                            All of the Above   </label>
                                    </li>

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>


                            {/* <div className="form-row radio-buttons">
                                <h2>6. Which of the below outcomes of Inclusiveness that you think you can achieve after this session?<sup>*</sup> </h2>
                                <ul>

                                   
                                <li className='checkbox-style'>
                                        {sixcheck && sixcheck.map((sixdata)=>(
                                        <>

                                        <div > 
    
                                                    <input

                                                        id={sixdata.name}
                                                        value={sixdata}
                                                        name={sixdata.name}
                                                        checked={sixdata?.isChecked || false }
                                                        type="checkbox"
                                                    
                                                        onChange={questionSix} />
                                                
                                                    <label  className='checkbox-label' htmlFor={sixdata.name}> {sixdata.name} </label>
                                        </div>
                                        </>
                                        ))}
                                    </li>
                                 


                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div> */}



                            {/* submit button */}
                            <div>
                                <button
                                    type="submit"
                                    onClick={CreatForm}
                                >Submit
                                </button>
                            </div>

                        </form>
                    </div>
                }

                {/* form end here */}

            </section>
    </>
    )
}

export default PostForm
