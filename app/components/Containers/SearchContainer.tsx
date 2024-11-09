

// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use client";

// IMPORTS
import { algoliasearch } from 'algoliasearch';
import { InstantSearch, SearchBox, Hits, useInstantSearch } from 'react-instantsearch';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import { Discussion, Story } from '@/firebase/database_types';
import { StoryCardSearch, DiscussionCardSearch } from '../Cards/SearchCards';

// Initializes Algolia Search Class
const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
)

// NO RESULTS COMPONENT - Renders when there are no results for users search
function NoResults() {
    
    // Accesses hook for search
    const { indexUiState } = useInstantSearch();

    return (
        <div className="empty_search">
            <div>
                No stories were found for "{indexUiState.query}"
            </div>
        </div>
    )
}

// NO RESULTS BOUNDARY COMPONENT - Renders NoResults Component or Hit Component based on search results
function NoResultsBoundary(
    { children, fallback }: 
    {children: React.ReactNode, fallback: React.ReactNode}
) {

    // Accesses hook for search
    const { results } = useInstantSearch();
  
    // The `__isArtificial` flag makes sure not to display the No Results message when no hits have been returned.
    if (!results.__isArtificial && results.nbHits === 0) {
      return (
        <>
          {fallback}
          <div hidden>{children}</div>
        </>
      );
    }
  
    return children;
}

// HIT STORY COMPONENT - Generates card with hit props
function HitStory(
    { hit }: 
    { hit: AlgoliaHit<Story> }) 
{
    return (
        <StoryCardSearch story={hit} />
    );
}

// HIT DISCUSSION COMPONENT - Generates card with hit props
function HitDiscussion(
    { hit }: 
    { hit: AlgoliaHit<Discussion> }) 
{
    return (
        <DiscussionCardSearch discussion={hit} />
    );
}

// SEARCH CONTAINER COMPONENT - Contains all Algolia Search components
export default function SearchContainer({ type }: { type: string }) {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={type}
        >
            <div className="search_input_container">
                <SearchBox 
                    classNames={{
                        input: "search_input"
                    }}
                    placeholder={"Search "+type+"..."}
                />
            </div>
            <div>
                <NoResultsBoundary fallback={<NoResults />}>
                    {
                        (type == "stories") ?
                        <Hits className="hits_container" hitComponent={HitStory} />:
                        <></>
                    }
                    {
                        (type == "discussions") ?
                        <Hits className="hits_container" hitComponent={HitDiscussion} />:
                        <></>
                    }
                </NoResultsBoundary>
            </div>
        </InstantSearch>
    )
}