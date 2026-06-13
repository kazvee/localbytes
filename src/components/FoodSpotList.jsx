import { useMemo } from 'react';
import Fuse from 'fuse.js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import localbytes from '../data/localbytes.json';

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function FoodSpotList({ searchQuery }) {
  const normalizedFoodSpots = useMemo(() => {
    return localbytes.map(r => ({
      ...r,
      n_name: normalizeText(r.name ?? ''),
      n_cuisine: normalizeText(r.cuisine ?? ''),
      n_city: normalizeText(r.city ?? ''),
      n_province: normalizeText(r.province ?? ''),
      n_notes: normalizeText(r.notes ?? ''),
      n_recommended: normalizeText((r.recommended ?? []).join(' '))
    }));
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(normalizedFoodSpots, {
      keys: ['n_name', 'n_cuisine', 'n_city', 'n_province','n_notes', 'n_recommended'],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      shouldSort: true,
      minMatchCharLength: 2,
      location: 0,
      distance: 100,
      ignoreLocation: true,
      findAllMatches: false
    });
  }, [normalizedFoodSpots]);

  const filteredFoodSpots = useMemo(() => {
    const results = searchQuery
      ? fuse.search(normalizeText(searchQuery)).map((result) => result.item)
      : normalizedFoodSpots;

    return shuffleArray(results);
  }, [searchQuery, fuse, normalizedFoodSpots]);
  return (
    <Container className='mt-4'>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {filteredFoodSpots.length > 0 ? (
          filteredFoodSpots.map((foodSpot) => (
            <Col key={`${foodSpot.name}-${foodSpot.postcode}`}>
              <Card className='h-100 border-double'>
                <Card.Body>
                  <Card.Title>{foodSpot.name}</Card.Title>
                  <Card.Subtitle className='mb-2'>
                    {foodSpot.cuisine}
                  </Card.Subtitle>
                  {/* <Card.Text>
                    <strong>Location:</strong> {foodSpot.city}, {foodSpot.province}, {foodSpot.postcode}
                  </Card.Text> */}

                  {/* {foodSpot.mapUrl && (
                    <Card.Text>
                      📍
                      <a href={foodSpot.mapUrl} target="_blank" rel="noopener noreferrer">
                        {foodSpot.city}, {foodSpot.province}, {foodSpot.postcode}
                      </a>
                    </Card.Text>
                  )} */}

                  {foodSpot.websiteUrl && (
                    <Card.Text>
                      🌐
                      <a href={foodSpot.websiteUrl} target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </Card.Text>
                  )}

                  {foodSpot.menuUrl && (
                    <Card.Text>
                      📗
                      <a href={foodSpot.menuUrl} target="_blank" rel="noopener noreferrer">
                        Menu
                      </a>
                    </Card.Text>
                  )}

                  {foodSpot.mapUrl && (
                    <Card.Text>
                      📍
                      <a href={foodSpot.mapUrl} target="_blank" rel="noopener noreferrer">
                        {foodSpot.city}, {foodSpot.province}, {foodSpot.postcode}
                      </a>
                    </Card.Text>
                  )}

                  {foodSpot.notes && foodSpot.notes.trim() !== '' && (
                    <Card.Text>
                      <strong>Notes:</strong> {foodSpot.notes}
                    </Card.Text>
                  )}

                  {foodSpot.recommended && foodSpot.recommended.length > 0 && (
                    <>
                      <Card.Text>
                        <strong>Recommended:</strong>
                      </Card.Text>
                      <ul className='foodspot-list'>
                        {foodSpot.recommended.map((dish, index) => (
                          <li key={index}>{dish}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className='d-flex justify-content-center w-100'>
            <Card className='border-double'>
              <Card.Body className='d-flex justify-content-center align-items-center'>
                <Card.Text>
                  <strong>No food places found</strong>
                  <Card.Subtitle className='mt-2'>
                    Try another search, or make a sandwich at home. 🥪
                  </Card.Subtitle>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default FoodSpotList;
