import React from 'react';
import { TagCloud } from 'react-tagcloud'
import './Cloud.scss';
import { useTranslation } from 'react-i18next';

export const TagsCloud = () => {
  const { t } = useTranslation();
  const data = [
    { value: t('tags_cloud.films'), count: 25 },
    { value: t('tags_cloud.serials'), count: 18 },
    { value: t('tags_cloud.games'), count: 38 },
    { value: t('tags_cloud.books'), count: 30 },
    { value: t('tags_cloud.arts'), count: 28 },
    { value: t('tags_cloud.cartoons'), count: 25 },
    {value: t('tags_cloud.technologies'), count: 25 },
  ]
  const customRenderer = (tag, size, color) => (
    <span
      key={tag.value}
      style={{
        animation: 'blinker 3s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: '2em',
        border: `2px solid ${color}`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
      }}
    >
      {tag.value}
    </span>
  )

    return (
        <TagCloud tags={data} minSize={1} maxSize={5} renderer={customRenderer} />
        
    )
}
