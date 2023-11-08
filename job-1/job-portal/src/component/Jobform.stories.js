import React from 'react'
import Tagpage from './Tagpage'
import Texteditor from './Texteditor'
import FileUpload from './FileUpload'
import Skillset from './Skillset'
import Description from './Description'

export default {
    title: 'Jobform'
}

export const Tags = () => <Tagpage></Tagpage>
export const Textedit = () => <Texteditor></Texteditor>
export const PicUpload = () => <FileUpload></FileUpload>
export const Skills = () => <Skillset></Skillset>
export const JobDescription = () => <Description></Description>
