import React from 'react'

export default function Gallery() {
    return (

        <div className='section-margin'>
            <section class="gallery min-vh-100" id='gallery'>
                <h1 className='text-center mb-5 section-title'>Gallery</h1>
                <div class="container-lg">
                    <div class="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
                        <div class="col" data-aos="zoom-in" data-aos-delay="10">
                            <img src="./images/hero_img1.png" class="gallery-item" alt="gallery" />
                        </div>
                        <div class="col" data-aos="zoom-in" data-aos-delay="10">
                            <img src="./images/hero_img2.jpg" class="gallery-item" alt="gallery" />
                        </div>
                        <div class="col" data-aos="zoom-in" data-aos-delay="10">
                            <img src="./images/hero_img4.jpg" class="gallery-item" alt="gallery" />
                        </div>
                        <div class="col" data-aos="zoom-in" data-aos-delay="10">
                            <img src="./images/hero_img5.jpg" class="gallery-item" alt="gallery" />
                        </div>
                        <div class="col" data-aos="zoom-in" data-aos-delay="10">
                            <img src="./images/event.avif" class="gallery-item" alt="gallery" />
                        </div>
                        <div class="col" data-aos="zoom-in" data-aos-delay="10">
                            <img src="./images/G_img2.jpg" class="gallery-item" alt="gallery" />
                        </div>
                        <div class="col" data-aos="zoom-in">
                            <img src="./images/event1.jpg" class="gallery-item" alt="gallery" />
                        </div>
                        <div class="col" data-aos="zoom-in" data-aos-delay="10">
                            <img src="./images/hero_img6.jpg" class="gallery-item" alt="gallery" />
                        </div>
                        <div class="col" data-aos="zoom-in" data-aos-delay="10">
                            <img src="./images/event2.jpg" class="gallery-item" alt="gallery" />
                        </div>
                    </div>
                </div>
            </section>

            <div class="modal fade" id="gallery-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="img/1.jpg" class="modal-img" alt="modal img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
