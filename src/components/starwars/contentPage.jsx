import React from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../redux/feature/starwarsSlice';
const ContentPage = ({ data }) => {

    const dispatch = useDispatch()

    const dislike = (name) => {
        dispatch(remove(name))
    }

    const createText = (item) => {
        const ans = []
        for (let key in item) {
            const val = item[key]
            if (!val.includes("swapi.dev") && !Array.isArray(val) && key !== "edited" && key !== "created") {
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
                            <div class="accordion-body position-relative">
                                {createText(item).map(i => {
                                    return <p>{i}</p>
                                })}
                                <div className='cw-starwars-dislike' onClick={() => dislike(item.name)}>
                                    <Icon icon="mdi:heart-off-outline" className='text-light fs-2' />
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default ContentPage;
