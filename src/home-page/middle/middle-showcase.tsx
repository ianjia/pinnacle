import React, { useMemo, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { useMiddleShowcaseStyles } from './hooks/use-middle-showcase-styles';
import { SECTION_CONTENT, SectionKey, TABS } from './sections';

export const MiddleShowcase: React.FC = () => {
  const css = useMiddleShowcaseStyles();
  const [active, setActive] = useState<SectionKey>('college');
  const section = useMemo(() => SECTION_CONTENT[active], [active]);

  return (
    // 🔹 Gradient now driven by the active tab
    <section
      className={css.middle}
      style={{
        backgroundImage: section.bgGradient,   // ← strong, cannot be mistaken as flat
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      {/* Top: pills */}
      <div className={`${css.midTopBar} ${css.container}`} role="tablist" aria-label="Feature areas">
        {TABS.map(({ key, label }) => {
          const isActive = active === key;
          return (
            <Button
              key={key}
              className={`${css.pill} ${isActive ? css.pillActive : ''}`}
              onClick={() => setActive(key)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${key}`}
              appearance="transparent"
              size="large"
              id={`tab-${key}`}
            >
              {label}
            </Button>
          );
        })}
      </div>

      {/* Middle: gradient hero (larger) */}
      <div
        id={`panel-${active}-hero`}
        role="region"
        aria-labelledby={`tab-${active}`}
        className={`${css.hero} ${css.container}`}   // ← ensure same container width
        style={{ background: section.heroGradient }}
      >
        <div className={css.heroInner}>
          <div className={css.heroText}>
            <h1 className={css.heroTitle}>{section.heroTitle}</h1>

            {Array.isArray(section.heroCopy) ? (
              <ul className={css.heroList} role="list">
                {section.heroCopy.map((line, i) => (
                  <li key={i} className={css.heroListItem}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className={css.heroSubtitle}>{section.heroCopy}</p>
            )}
          </div>

          <div className={css.heroImageWrap} aria-hidden="true">
            <img className={css.heroImage} src={section.heroImage} alt="" />
          </div>
        </div>
      </div>

      {/* Bottom: 4 larger tiles */}
      <div
        id={`panel-${active}`}
        role="region"
        aria-labelledby={`tab-${active}`}
        className={`${css.cardsGrid} ${css.container}`}
      >
        {section.tiles.map((t, i) => (
          <article className={css.card} key={i}>
            <div className={css.cardImageWrap}>
              {/* NEW inset wrapper for inner gap */}
              <div className={css.cardImageInner}>
                <img className={css.cardImage} src={t.img} alt={t.alt} />
              </div>
            </div>

            <div className={css.cardBody}>
              <h3 className={css.cardTitle}>{t.title}</h3>
              <p className={css.cardText}>{t.body}</p>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
};
