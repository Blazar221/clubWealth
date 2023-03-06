import React from 'react';

const ContentPage = ({ data }) => {
    const createText = (item) => {
        const ans = []
        for (let key in item) {
            const val = item[key]
            if (!val.includes("swapi.dev") && !Array.isArray(val)) {
                ans.push(`${key}: ${val}`);
            }
        }
        return ans
    }

    return (
        <div class="accordion" id="accordionPanelsStayOpenExample">
            {
                data.map((item, index) => {
                    return <div class="accordion-item bg-light">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                {item.name}
                            </button>
                        </h2>
                        <div id={`collapse${index}`} class={`accordion-collapse collapse ${index == 0 ? "show" : ""}`} aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                {createText(item).map(i => {
                                    return <p>{i}</p>
                                })}
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default ContentPage;
