import { useHistory } from 'react-router-dom';

const SplashPage = () => {
    const history = useHistory();



    return (
        <div className='page-container'>
            <div className='top-content'>
                <div className='heading-and-button'>
                    <h1>Tame your work, organize your life</h1>
                    <h5>
                        Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
                    </h5>
                    <p className='signup-tag'>
                        <a href='/signup' className='btn-signup-tag'>
                            Sign up for free
                        </a>
                    </p>
                    <p className='login-tag'>
                        <a href='/login' className='btn-login-tag'>
                            Already have an account? Log in
                        </a>
                    </p>
                </div>
                <div className='mid-content-1'>
                    <div className='mid-content-img-container'>
                        <img src='https://evernote.com/c/assets/homepage-repackaging/task_hero_image@2x__en.png?b8ddc3599750b793' alt='missing'/>
                    </div>
                    <div className='mid-content-carousel-container'>
                        <div className='carousel-texts'>
                            <div className="hero-carousel-text">
                                <div className="heading">
                                    <p className="p-title hero-carousel-text-heading">WORK ANYWHERE</p>
                                </div>


                                <div className="description">
                                    <p className="p-small">Keep important info handy—your notes sync automatically to all your devices.</p>
                                </div>
                            </div>

                            <div className="hero-carousel-text">
                                <div className="heading">
                                    <p className="p-title hero-carousel-text-heading">REMEMBER EVERYTHING</p>
                                </div>
                                <div className="description">
                                    <p className="p-small">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
                                </div>
                            </div>

                            <div className="hero-carousel-text">
                                <div className="heading">
                                    <p className="p-title hero-carousel-text-heading">TURN TO-DO INTO DONE</p>
                                </div>
                                <div className="description">
                                    <p className="p-small">Bring your notes, tasks, and schedules together to get things done more easily.</p>
                                </div>
                            </div>

                            <div className="hero-carousel-text">
                                <div className="heading">
                                    <p className="p-title hero-carousel-text-heading">FIND THINGS FAST</p>
                                </div>
                                <div className="description">
                                    <p className="p-small">Get what you need, when you need it with powerful, flexible search capabilities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-card-component">
                <div className="info-cards">
                    <div className='card'>
                        <div className='image'>
                            <img src='https://evernote.com/c/assets/homepage-repackaging/feature_task@2x__en.png?48c2885bd8c8805' alt='image with a note'/>
                        </div>
                        <div className='info'>
                            <img className="content-image" src="https://evernote.com/c/assets/homepage-repackaging/task_icon.svg?15f56a9a9cce7f60" alt=""/>
                            <h3 className="heading">Hit every deadline</h3>
                            <div className="content">Create and assign tasks inside your notes with due dates, flags, and reminders so nothing falls through the cracks.</div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='image'>
                            <img src='https://evernote.com/c/assets/homepage-repackaging/go_paperless__en.png?4e2ca7e52744f53a' alt="Image of document scan on mobile and desktop"/>
                        </div>
                        <div className='info'>
                            <img className="content-image" src="https://evernote.com/c/assets/homepage-repackaging/doc-scanning.svg?e3895d5ca04c0b30" alt=""/>
                            <h3 className="heading">Go paperless</h3>
                            <div className="content">Scan important documents and keep them handy on all your devices. Save the information—not the clutter.</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default SplashPage;
