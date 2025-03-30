# Trademarkia Search

A Next.js application that replicates the Trademarkia search functionality, allowing users to search and filter trademark records across the United States.

## Features

- 🔍 Advanced trademark search with real-time results
- 🏷️ Multiple filter options (Status, Owners, Law Firms, Attorneys)
- 📱 Responsive design following Trademarkia's UI/UX standards
- 🔄 Real-time status indicators for search progress
- 🔗 Shareable search results via URL parameters
- ⚡ Server-side rendering with Next.js
- 📦 Data caching with SWR
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📝 Full TypeScript support

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Data Fetching**: SWR
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trademarkia-search.git
cd trademarkia-search
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Get your Trademarkia API key:
   - Contact Trademarkia support at support@trademarkia.com
   - Request an API key for development purposes
   - Provide your:
     - Name
     - Company/Organization
     - Project description
     - Intended use of the API
   
   Note: While waiting for the API key, the application will use sample data for development purposes.

4. Create a `.env.local` file in the root directory:
```env
# Trademarkia API Key (leave empty to use sample data)
NEXT_PUBLIC_TRADEMARKIA_API_KEY=

# API Base URL
NEXT_PUBLIC_API_URL=https://api.trademarkia.com/trademarks/search
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main search page
├── components/          # UI components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## Features in Detail

### Search Functionality
- Real-time search results
- Status indicators (Searching, No Results, Error)
- Debounced search input
- Error handling with fallback to sample data

### Filtering
- Status filters (Registered, Pending, Abandoned, Others)
- Owner filters
- Law firm filters
- Attorney filters
- Multiple filter selection support

### Data Management
- SWR for data fetching and caching
- Optimistic updates
- Error boundary handling
- Loading states
- Sample data fallback

### URL Sharing
- Search query parameters in URL
- Filter state preservation
- Shareable links with complete search context

## API Integration

The application integrates with the Trademarkia API for trademark searches. Key endpoints:

- `/trademarks/search` - Main search endpoint
  - Parameters:
    - `q`: Search query
    - `status`: Filter by status
    - `owner`: Filter by owner
    - `law_firm`: Filter by law firm
    - `attorney`: Filter by attorney

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Trademarkia](https://www.trademarkia.com/) for the original design inspiration
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the amazing React framework