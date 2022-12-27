

import { Textarea } from '@mantine/core';

export default function PostJob(){


    return(
        <div>
            
            <Textarea
        placeholder="Title of Your Job"
        label="Job Title"
        autosize
        minRows={2}
            />

            <Textarea
        placeholder="Website Link to Apply for Job or Email address "
        label="Job Link"
        autosize
        minRows={2}
            />

            <Textarea
        placeholder="Example: CAD $50- $60k"
        label="Salary"
        autosize
        minRows={2}
            />

            <Textarea
        placeholder="Example: CAD $50- $60k"
        label="Salary"
        autosize
        minRows={5}
            />

        </div>
    )

}