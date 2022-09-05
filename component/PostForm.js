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

const fourcheckdata = [
    { name: "Identify 'Seeking Admiration' situations in Personal/Professional Relationships" },
    { name: "Identify 'Being Loyal' situations in Professional/Business Relationships" },
    { name: "Identify impacts related to Personal Health due to being inauthentic" },
    { name: "Identify areas of inauthenticity in Professional/Business Health" },
    { name: "Identify 'Looking Good' situations related to Personal Wealth" },   
];

const sixcheckdata = [

    { name: "You lose trust" },
    { name: "You look good/smart in front of others " },
    { name: "You lose health" },
    { name: "You lose relations" },
    
];

const sevencheckdata = [
    { name: "Stronger Connections" },
    { name: "You feel Powerful " },
    { name: "You would not look good" },
    { name: "You are Fearless " },
]

const PostFormtwo = () => {

    //state used for form
    const [phoneNum, setphoneNum] = useState('')
    const [username, setusername] = useState('')
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [singleUsers, setsingleUsers] = useState('');


    const [onecheck, setoneCheck] = useState('');
    const [twocheck, setTwoCheck] = useState('');
    const [threecheck, setThreeCheck] = useState('');
    const [threeQuestionInput1, setThreeQuestionInput1] = useState("");
    const [threeQuestionInput, setThreeQuestionInput] = useState("");
    const [fourcheck, setFourCheck] = useState(fourcheckdata);
    const [fivecheck, setFiveCheck] = useState('');

    const [sixcheck, setSixCheck] = useState(sixcheckdata);
    const [sevencheck, setSevenCheck] = useState(sevencheckdata);
    const [eightcheck, setEightCheck] = useState('');

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




    //function for add data in firebase
    const CreatForm = async (event) => {
        event.preventDefault();

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);

        const data = {

            username: username,
            phoneNum: phoneNum,
            PreOneAns: onecheck,
            PreTwoAns: twocheck,
            PreThreeAns: threecheck,
            PreThreeInput: threeQuestionInput,
            PreThreeInput1: threeQuestionInput1,
            PreFourAns: fourcheck,
            PreFiveAns: fivecheck,
            PreSixAns:sixcheck,
            PreSevenAns: sevencheck,
            PreEightAns: eightcheck,
            prefeedbackImg: postfeedbackImg,
            createdBy:Timestamp.now(),


        };

        //if user empty throw error else merge the form data in firebase
          //if user empty throw error else merge the form data in firebase
        if (onecheck==="" || twocheck==="" || fourcheck==="" || fivecheck==="" || sixcheck==="")
        {
            seterror(true);
            setFourCheck(fourcheckdata);
            setSixCheck(sixcheckdata);
            setSevenCheck(sevencheckdata);
           
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
        setTwoCheck("");
        setThreeCheck("");
        setThreeQuestionInput("");
        setThreeQuestionInput1("");
        setFourCheck(fourcheck);
        setFiveCheck("");
        setSixCheck(sixcheck);
        setSevenCheck(sevencheck);
        setEightCheck("");
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

    const questionThree = (event) => {
        const target = event.target;
        if (target.checked) {
            setThreeCheck(target.value);
            console.log(event.target.value);
        }
    };

    const questionFour = (e) => {
        const {name,checked} = e.target;

        let tempFourData=fourcheck.map((fourdetails)=>
        fourdetails.name === name ? {...fourdetails, isChecked:checked} : fourdetails);
        setFourCheck(tempFourData)
        console.log("fourquestion",fourcheck);
    }

    const questionFive = (event) => {
        const target = event.target;
        if (target.checked) {
            setFiveCheck(target.value);
            console.log(event.target.value);
        }
    };

    const questionSix = (e) => {
        const {name,checked} = e.target;

        let tempSixData=sixcheck.map((sixdetails)=>
        sixdetails.name === name ? {...sixdetails, isChecked:checked} : sixdetails);
        setSixCheck(tempSixData)
        console.log("sixquestion",sixcheck);
    }

    const questionSeven = (e) => {
        const {name,checked} = e.target;

        let tempSevenData=sevencheck.map((sevendetails)=>
        sevendetails.name === name ? {...sevendetails, isChecked:checked} : sevendetails);
        setSevenCheck(tempSevenData)
        console.log("sevenquestion",sevencheck);
    }

    const questionEight = (event) => {
        const target = event.target;
        if (target.checked) {
            setEightCheck(target.value);
            console.log(event.target.value);
        }

    };

    

    


    useEffect(() =>{
        setFourCheck(fourcheckdata);
     

    },[])

    useEffect(() =>{
        setSevenCheck(sevencheckdata);
     

    },[])

    useEffect(() =>{
       
        setSixCheck(sixcheckdata);

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

            const docRef = doc(db, "AdminMonthlyMeet", eventName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setsingleUsers(docSnap.data());
                console.log(singleUsers);
                console.log("Document data:", docSnap.data());
                setpostfeedbackImg(docSnap.data().formImgUrls);
                setmobileFormbg(docSnap.data().mobileUrls);
                seteventName(docSnap.data().eventName);
                // setwhatsappgroup(docSnap.data().whatsappLink);
                console.log(docSnap.data().whatsappLink);


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }
        // getContent();
        getsingleDoc();
    }, []);


    return (
      <>

            <Header/>
            <section className="c-containerForm">

                <div className='topbanner'>
                    <img className='desktopFormbg' src={postfeedbackImg} />
                    <img className='mobileFormbg' src={mobileFormbg} />
                    
                    <div className="bannertext">
                        <h1>{eventName}</h1>
                    </div>
                </div>

                {/* form start  */}

                {

                    formsubmit ? <div className="sucess">
                        <h2>  Thank you for sharing your responses. </h2>

                        <Link href="/dashboard" ><a className="homelink">Go back to home</a></Link>

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
                                <h2>1. Is being 'Authentic' easy for you?<sup>*</sup> </h2>

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
                                            No  
                                        </label>
                                    </li>
                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>                           


                            {/* 2nd question */}
                            <div className="form-row radio-buttons">
                                <h2>2. Are you now aware of your own inauthenticity? <sup>*</sup></h2>
                                
                                <ul>
                                    <li>
                                        <label htmlFor="2A">
                                            <input
                                                id="2A"
                                                value="Yes"
                                                name="questionTwo"
                                                type="radio"
                                                onChange={questionTwo}
                                                checked={twocheck == 'Yes'} />
                                            <div className='custom_radio'></div>
                                            Yes
                                        </label>

                                    </li>

                                    <li>
                                        <label htmlFor="2B">
                                            <input
                                                id="2B"
                                                value="No"
                                                name="questionTwo"
                                                type="radio"
                                                onChange={questionTwo}
                                                checked={twocheck == 'No'} />
                                            <div className='custom_radio'></div>
                                            No  
                                        </label>
                                    </li>
                                </ul>    
                                
                                
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>


                            {/* 3rd question */}
                            <div className="form-row radio-buttons">
                                <h2>3. Share your 2 judgements that typically come in your mind while listening to others.  </h2>
                                <ul>
                                    <li>
                                    <input type="text"
                                             id="threeInput"
                                            value={threeQuestionInput1}
                                            name="questionThree"
                                            placeholder='response 1'
                                            required
                                            onChange={(event) => {
                                                setThreeQuestionInput1(event.target.value)
                                            }} />
                                    </li>

                                    <br/>

                                    <li>
                                    <input type="text"
                                             id="threeInput"
                                            value={threeQuestionInput}
                                            name="questionThree"
                                            placeholder='response 2'
                                            required
                                            onChange={(event) => {
                                                setThreeQuestionInput(event.target.value)
                                            }} />
                                    </li>

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>

                            {/* 4th question */}
                            <div className="form-row radio-buttons">
                                <h2>4. In which of the below mentioned areas you need immediate help/support from the Nucleus Team?  <sup>*</sup></h2>
                                <ul>

                                    
                                    <li className='checkbox-style'>
                                        {fourcheck && fourcheck.map((fourdata)=>(
                                        <>

                                        <div > 
    
                                                    <input

                                                        id={fourdata.name}
                                                        value={fourdata}
                                                        name={fourdata.name}
                                                        checked={fourdata?.isChecked || false }
                                                        type="checkbox"
                                                    
                                                        onChange={questionFour} />
                                                
                                                    <label  className='checkbox-label' htmlFor={fourdata.name}> {fourdata.name} </label>
                                        </div>
                                        </>
                                        ))}
                                    </li>
                            

                                
                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>


                             {/* 5th multiple check box */}
                             <div className="form-row radio-buttons">
                                <h2>5. Which of the below things you think is impacting your authenticity the most?  <sup>*</sup></h2>
                                <ul>

                                    <li>
                                        <label htmlFor="5A">
                                            <input
                                                id="5A"
                                                value="Seeking admiration"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'Seeking admiration'} />
                                            <div className='custom_radio'></div>
                                            Seeking admiration</label>
                                    </li>

                                    <li>
                                        <label htmlFor="5B">
                                            <input
                                                id="5B"
                                                value="Being Loyal"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'Being Loyal'} />
                                            <div className='custom_radio'></div>
                                            Being Loyal </label>
                                    </li>

                                    <li>
                                        <label htmlFor="5C">
                                            <input
                                                id="5C"
                                                value="Looking Good"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'Looking Good'} />
                                            <div className='custom_radio'></div>
                                            Looking Good</label>
                                    </li>

                                    <li>
                                        <label htmlFor="5D">
                                            <input
                                                id="5D"
                                                value="All of the above"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'All of the above'} />
                                            <div className='custom_radio'></div>
                                            All of the above</label>
                                    </li>

                                    <li>
                                        <label htmlFor="5E">
                                            <input
                                                id="5E"
                                                value="None of the above"
                                                name="questionFive"
                                                type="radio"
                                                onChange={questionFive}
                                                checked={fivecheck == 'None of the above'} />
                                            <div className='custom_radio'></div>
                                            None of the above</label>
                                    </li>

                                  

                                   

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }
                            </div>



                            {/* 6th question */}
                            <div className="form-row radio-buttons">
                            <h2>6. Which one of the below things that happens due to being inauthentic?<sup>*</sup>  </h2>
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

                        </div>

                        {/* 7th Question */}
                        <div className="form-row radio-buttons">
                                <h2>7. Which of the below outcomes of being Authentic, you think you can achieve after this session? <sup>*</sup></h2>
                                <ul>

                                    
                                    <li className='checkbox-style'>
                                        {sevencheck && sevencheck.map((sevendata)=>(
                                        <>

                                        <div > 
    
                                                    <input

                                                        id={sevendata.name}
                                                        value={sevendata}
                                                        name={sevendata.name}
                                                        checked={sevendata?.isChecked || false }
                                                        type="checkbox"
                                                    
                                                        onChange={questionSeven} />
                                                
                                                    <label  className='checkbox-label' htmlFor={sevendata.name}> {sevendata.name} </label>
                                        </div>
                                        </>
                                        ))}
                                    </li>

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>

                            {/* 8th Question */}

                            <div className="form-row radio-buttons">
                                <h2>8. What do you carry for yourself from today's session? <sup>*</sup></h2>
                                <ul>

                                    <li>
                                        <label htmlFor="8A">
                                            <input
                                                id="8A"
                                                value="Authenticity is about “Mansa Vaacha Kaaya”"
                                                name="questionEight"
                                                type="radio"
                                                onChange={questionEight}
                                                checked={eightcheck == 'Authenticity is about “Mansa Vaacha Kaaya”'} />
                                            <div className='custom_radio'></div>
                                            Authenticity is about “Mansa Vaacha Kaaya”</label>
                                    </li>

                                    <li>
                                        <label htmlFor="8B">
                                            <input
                                                id="8B"
                                                value="Authenticity is not my cup of tea"
                                                name="questionEight"
                                                type="radio"
                                                onChange={questionEight}
                                                checked={eightcheck == 'Authenticity is not my cup of tea'} />
                                            <div className='custom_radio'></div>
                                            Authenticity is not my cup of tea </label>
                                    </li>

                                    <li>
                                        <label htmlFor="8C">
                                            <input
                                                id="8C"
                                                value="Being Authentic gives me power to create my future"
                                                name="questionEight"
                                                type="radio"
                                                onChange={questionEight}
                                                checked={eightcheck == 'Being Authentic gives me power to create my future'} />
                                            <div className='custom_radio'></div>
                                            Being Authentic gives me power to create my future</label>
                                    </li>

                                    <li>
                                        <label htmlFor="8D">
                                            <input
                                                id="8D"
                                                value="Nothing"
                                                name="questionEight"
                                                type="radio"
                                                onChange={questionEight}
                                                checked={eightcheck == 'Nothing'} />
                                            <div className='custom_radio'></div>
                                            Nothing</label>
                                    </li>

                                </ul>
                                {
                                    error ? <div className="error"><p>this is required</p></div> : null
                                }

                            </div>



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

export default PostFormtwo
