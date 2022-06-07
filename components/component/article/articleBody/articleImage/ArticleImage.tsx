import Image from 'next/image'
import style from "./Articleimage.module.scss";

const ArticleImage = ({alt, src}: { alt?: string; src?: string; }) => {
    return <div className={style.imgWrapper}>
        {src &&
            <Image
                src={src}
                className={style.img}
                alt={alt}
                priority={alt?.includes('priority')}
                layout="fill"
                sizes={"50vw"}
                objectFit="contain"
            />
        }
    </div>
};

export default ArticleImage;
