import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {registerPage} from "../src/Utils";
import {useTranslations} from "../src/Translations";
import {requestApi} from "../src/Network";
import Header from "../components/section/Header";
import FooterSection from "../components/section/FooterSection";
import {FeedbackButton} from "../components/component/FeedbackButton";
import KotlinPlayground from "../components/component/KotlinPlayground";

type GenerationForm = {
    code: string,
    newName: string,
    suffix: string,
}

type GenerateResp = {
    dto: string,
    groovyBuilder: string,
    groovyObjectAssertion: string,
    typeScriptObject: string,
}

export default function GenerateDtoPage() {
    const pageKey = `generate-dto`;
    registerPage(pageKey)
    const t = useTranslations();
    const [resp, setResp] = useState<GenerateResp>()
    const [version, setVersion] = useState(0)

    const defaultCode = `class User(
   val id: UserId, 
   val name: String, 
   val surname: String, 
   val age: Int, 
   val tokens: List<Token>
)`
    const {register, setValue, handleSubmit, errors} = useForm<GenerationForm>({
        defaultValues: {
            code: defaultCode,
            suffix: "Json"
        }
    });

    const onSubmit = (data: GenerationForm) => {
        requestApi<GenerateResp>("generate", {
            method: "POST",
            body: {
                code: data.code,
                options: {
                    newName: data.newName,
                    suffix: data.suffix
                }
            }
        }).then(d => {
            setVersion(version + 1)
            setResp(d)
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops... error',
                text: 'Check your code and try again'
            })
        })
    }

    return <>
        <Header/>
        <section className="form">
            <div className="content-container">
                <h1>{t.generate.title}</h1>
                <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: "40px"}}>
                    <fieldset>
                        <label htmlFor="code">{t.generate.pastePrompt}</label>
                        <textarea name="code" style={{height: "200px"}} id="code" ref={register}
                                  placeholder="class User(..."/>
                    </fieldset>

                    <div style={{display: 'flex'}}>
                        <fieldset style={{flex: 1}}>
                            <label htmlFor="newName">{t.generate.dtoName}</label>
                            <input type="text" name="newName" id="newName" ref={register} placeholder=""/>
                        </fieldset>
                        <fieldset style={{flex: 1}}>
                            <label htmlFor="suffix">{t.generate.dtoSuffix}</label>
                            <input type="text" name="suffix" id="suffix" ref={register} placeholder=""/>
                        </fieldset>
                    </div>

                    <input type="submit" className="button button--mini" id="submit"
                           style={{position: "relative", right: "50%", left: "40%"}}
                           value={t.generate.generateButton}/>
                </form>

                {resp &&
                <>
                    <div key={"DTO" + version}>
                        <h3>DTO</h3>
                        <KotlinPlayground className="text-align-left margin-bottom-50" readOnly={true}>
                            {resp.dto}
                        </KotlinPlayground>
                    </div>
                    <div key={"Builder" + version}>
                        <h3>Groovy Builder</h3>
                        <KotlinPlayground mode="groovy" className="text-align-left margin-bottom-50" readOnly={true}>
                            {resp.groovyBuilder}
                        </KotlinPlayground>
                    </div>
                    <div key={"Assertion" + version}>
                        <h3>Groovy Assertion</h3>
                        <KotlinPlayground mode="groovy" className="text-align-left margin-bottom-50" readOnly={true}>
                            {resp.groovyObjectAssertion}
                        </KotlinPlayground>
                    </div>
                    <div key={"TypeScript" + version}>
                        <h3>TypeScript definition</h3>
                        <KotlinPlayground mode="typescript"
                                          className="text-align-left margin-bottom-50"
                                          readOnly={true}>
                            {resp.typeScriptObject}
                        </KotlinPlayground>
                    </div>
                </>
                }
                <FeedbackButton pageKey={pageKey}/>
            </div>
        </section>
        <FooterSection/>
    </>;
};
