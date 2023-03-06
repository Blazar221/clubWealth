import React from 'react';

const PeoplePage = ({ data }) => {
    return (
        <div class="accordion" id="accordionPanelsStayOpenExample">
            {
                data.map((item, index) => {
                    return <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                {item.name}
                            </button>
                        </h2>
                        <div id={`collapse${index}`} class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                {item.map(i => {
                                    return i
                                })}
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default PeoplePage;
