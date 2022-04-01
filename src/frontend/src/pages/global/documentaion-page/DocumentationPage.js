import styles from './DocumentationPage.module.scss'

import {useState} from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const DocumentationPage = () => {

    return (
        <div className={styles.contents}>
            <div>
                <h2>Buttons</h2>
                <h3>primary</h3>

                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<button className={'button-primary sm'}>Foo</button>`}
                    </SyntaxHighlighter>
                    <button className={"button-primary sm"} type={'button'}>Foo</button>
                </div>

                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<button className={'button-primary lg'}>Foo</button>`}
                    </SyntaxHighlighter>
                    <button className={"button-primary lg"} type={'button'}>Foo</button>
                </div>

                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<button className={'button-primary'}>Foo</button>`}
                    </SyntaxHighlighter>
                    <button className={"button-primary"} type={'button'}>Foo</button>
                </div>



                <h3>outline</h3>
                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<button className={'button-primary-outline'}>Foo</button>`}
                    </SyntaxHighlighter>
                    <button className={"button-primary-outline"} type={'button'}>Foo</button>
                </div>
                <h3>drop-shadow</h3>
                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<button className={'button-primary bx-sh'}>Foo</button>`}
                    </SyntaxHighlighter>
                    <button className={'button-primary bx-sh'} type={'button'}>Foo</button>
                </div>
                <h2>Inputs</h2>
                <h3>primary</h3>

                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<input className={'input-primary sm'} placeholder={'Foo'}/>`}
                    </SyntaxHighlighter>
                    <input className={'input-primary sm'} placeholder={'Foo'}/>
                </div>

                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<input className={'input-primary lg'} placeholder={'Foo'}/>`}
                    </SyntaxHighlighter>
                    <input className={'input-primary lg'} placeholder={'Foo'}/>
                </div>



                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<input className={'input-primary'} placeholder={'Foo'}/>`}
                    </SyntaxHighlighter>
                    <input className={'input-primary'} placeholder={'Foo'}/>
                </div>

                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<input className={'input-primary correct'} placeholder={'Foo'}/>`}
                    </SyntaxHighlighter>
                    <input className={'input-primary correct'} placeholder={'Foo'}/>
                </div>

                <div className={styles.content}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`<input className={'input-primary error'} placeholder={'Foo'}/>`}
                    </SyntaxHighlighter>
                    <input className={'input-primary error'} placeholder={'Foo'}/>
                </div>
            </div>
        </div>)
}